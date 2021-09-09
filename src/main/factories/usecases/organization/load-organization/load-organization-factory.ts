import { DbLoadOrganization } from '../../../../../data/usecases/organization/load-organization/db-load-organization'
import { OrganizationDynamodbRepository } from '../../../../../infra/db/dynamodb/organization/organization-dynamodb-repository'
import { DynamoDBClientFactory } from '../../../../../infra/aws/factories/aws-config-factory'

export const makeDbLoadOrganization = (): DbLoadOrganization => {
  const dynamoClient = DynamoDBClientFactory({ apiVersion: '2012-08-10' })
  const repository = new OrganizationDynamodbRepository(dynamoClient)
  return new DbLoadOrganization(repository)
}
