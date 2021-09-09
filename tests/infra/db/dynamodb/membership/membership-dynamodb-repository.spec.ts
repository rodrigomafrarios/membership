import { mockAddMembershipRepositoryParams } from '@/tests/data/mocks/membership-mocks'
import { DynamoDBClientFactory } from '@/infra/aws/factories/aws-config-factory'
import { MembershipDynamodbRepository } from '@/infra/db/dynamodb/membership/membership-dynamodb-repository'

type SutTypes = {
  sut: MembershipDynamodbRepository
  client: AWS.DynamoDB.DocumentClient
}

const makeSut = (): SutTypes => {
  const client = DynamoDBClientFactory({
    region: 'local',
    endpoint: 'http://localhost:8000',
    apiVersion: '2012-08-10'
  })
  const sut = new MembershipDynamodbRepository(client)
  return {
    sut,
    client
  }
}

describe('MembershipDynamodbRepository', () => {
  beforeAll(() => {
    process.env.DYNAMODB_TABLE_MEMBERSHIPS = 'test-memberships'
  })
  describe('add()', () => {
    it('should add membership', async () => {
      const { sut } = makeSut()
      const response = await sut.add(mockAddMembershipRepositoryParams())
      expect(response).toBeTruthy()
    })
  })
})
