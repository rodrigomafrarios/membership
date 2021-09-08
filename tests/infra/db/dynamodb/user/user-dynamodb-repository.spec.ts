import { UserDynamoDbRepository } from '@/infra/db/dynamodb/user/user-dynamodb-repository'
import { DynamoDBClientFactory } from '@/infra/aws/factories/aws-config-factory'
import { mockAddUserParams } from '@/tests/data/mocks/user-mocks'
import { v4 as uuidv4 } from 'uuid'

type SutTypes = {
  sut: UserDynamoDbRepository
  client: AWS.DynamoDB.DocumentClient
}

const makeSut = (): SutTypes => {
  const client = DynamoDBClientFactory({
    region: 'local',
    endpoint: 'http://localhost:8000',
    apiVersion: '2012-08-10'
  })
  const sut = new UserDynamoDbRepository(client)
  return {
    sut,
    client
  }
}

describe('UserDynamoDbRepository', () => {
  beforeAll(() => {
    process.env.DYNAMODB_TABLE_USERS = 'test-users'
  })
  describe('loadByEmail()', () => {
    test('Should load an User', async () => {
      const { sut, client } = makeSut()
      const id = uuidv4()
      await client.transactWrite({
        TransactItems: [{
          Put: {
            TableName: 'test-users',
            Item: {
              id,
              name: 'any_name',
              email: 'any_email@gmail.com',
              password: '123'
            }
          }
        }]
      }).promise()

      const results = await sut.loadByEmail('any_email@gmail.com')

      expect(results).toEqual({
        id,
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: '123'
      })
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update accessToken', async () => {
      const { sut, client } = makeSut()
      const id = uuidv4()
      await client.transactWrite({
        TransactItems: [{
          Put: {
            TableName: 'test-users',
            Item: {
              id,
              name: 'any_name',
              email: 'any_email@gmail.com',
              password: '123'
            }
          }
        }]
      }).promise()

      await sut.updateAccessToken('any_email@gmail.com', 'any_token')

      const { Item } = await client.get({
        TableName: process.env.DYNAMODB_TABLE_USERS,
        Key: {
          email: 'any_email@gmail.com'
        }
      }).promise()

      expect(Item.accessToken).toBeTruthy()
      expect(Item.accessToken).toBe('any_token')
    })
  })

  describe('add()', () => {
    test('Should add an User', async () => {
      const { sut } = makeSut()
      const results = await sut.add(mockAddUserParams())

      expect(results).toBeTruthy()
      expect(results.email).toStrictEqual('any_email@mail.com')
    })
  })

  describe('list()', () => {
    it('should list users', async () => {
      const { sut } = makeSut()
      const results = await sut.list()
      expect(results).toBeTruthy()
      expect(results.length).toBe(2)
    })
  })
})
