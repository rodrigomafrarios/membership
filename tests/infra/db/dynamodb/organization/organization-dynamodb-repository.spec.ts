import { OrganizationDynamodbRepository } from '@/infra/db/dynamodb/organization/organization-dynamodb-repository'
import { DynamoDBClientFactory } from '@/infra/aws/factories/aws-config-factory'

type SutTypes = {
  sut: OrganizationDynamodbRepository
  client: AWS.DynamoDB.DocumentClient
}

const makeSut = (): SutTypes => {
  const client = DynamoDBClientFactory({
    region: 'local',
    endpoint: 'http://localhost:8000',
    apiVersion: '2012-08-10'
  })
  const sut = new OrganizationDynamodbRepository(client)
  return {
    sut,
    client
  }
}

describe('OrganizationDynamodbRepository', () => {
  beforeAll(() => {
    process.env.DYNAMODB_TABLE_ORGANIZATIONS = 'test-organizations'
  })
  describe('add()', () => {
    it('should add an organization', async () => {
      const { sut } = makeSut()
      const response = await sut.add({
        organizationId: 'any-organization-id',
        name: 'any-name'
      })
      expect(response).toBeTruthy()
    })
  })
  describe('list()', () => {
    it('should list organizations', async () => {
      const { sut } = makeSut()
      await sut.add({
        organizationId: 'any-organization-id',
        name: 'any-name'
      })

      const organizations = await sut.list()
      expect(organizations.length).toBe(1)
    })
  })
  describe('loadByOrganizationId()', () => {
    it('should load an organization', async () => {
      const { sut } = makeSut()
      await sut.add({
        organizationId: 'any-organization-id',
        name: 'any-name'
      })
      const organization = await sut.loadByOrganizationId('any-organization-id')
      expect(organization.organizationId).toEqual('any-organization-id')
      expect(organization.name).toEqual('any-name')
    })
  })
})
