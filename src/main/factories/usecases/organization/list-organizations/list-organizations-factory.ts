import { DbListOrganizations } from '../../../../../data/usecases/organization/list-organizations/db-list-organizations'
import { OrganizationDynamodbRepository } from '../../../../../infra/db/dynamodb/organization/organization-dynamodb-repository'
import { DynamoDBClientFactory } from '../../../../../infra/aws/factories/aws-config-factory'

export const makeDbListOrganizations = (): DbListOrganizations => {
  const dynamoClient = DynamoDBClientFactory({ apiVersion: '2012-08-10' })
  const repository = new OrganizationDynamodbRepository(dynamoClient)
  return new DbListOrganizations(repository)
}
