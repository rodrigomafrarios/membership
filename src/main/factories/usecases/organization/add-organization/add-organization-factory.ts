import { OrganizationDynamodbRepository } from '../../../../../infra/db/dynamodb/organization/organization-dynamodb-repository'
import { DbAddOrganization } from '../../../../../data/usecases/organization/add-organization/db-add-organization'
import { DynamoDBClientFactory } from '../../../../../infra/aws/factories/aws-config-factory'

export const makeDbAddOrganization = (): DbAddOrganization => {
  const dynamoClient = DynamoDBClientFactory({ apiVersion: '2012-08-10' })
  const repository = new OrganizationDynamodbRepository(dynamoClient)
  return new DbAddOrganization(repository)
}
