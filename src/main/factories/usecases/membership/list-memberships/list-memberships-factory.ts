import { DynamoDBClientFactory } from '../../../../../infra/aws/factories/aws-config-factory'
import { MembershipDynamodbRepository } from '../../../../../infra/db/dynamodb/membership/membership-dynamodb-repository'
import { DbListMemberships } from '../../../../../data/usecases/membership/list-memberships/db-list-memberships'

export const makeDbListMemberships = (): DbListMemberships => {
  const dynamoClient = DynamoDBClientFactory({ apiVersion: '2012-08-10' })
  const membershipRepository = new MembershipDynamodbRepository(dynamoClient)
  return new DbListMemberships(membershipRepository)
}
