import { OrganizationDynamodbRepository } from '../../../../../infra/db/dynamodb/organization/organization-dynamodb-repository'
import { UserDynamoDbRepository } from '../../../../../infra/db/dynamodb/user/user-dynamodb-repository'
import { DbAddMembership } from '../../../../../data/usecases/membership/add-membership/db-add-membership'
import { DynamoDBClientFactory } from '../../../../../infra/aws/factories/aws-config-factory'
import { MembershipDynamodbRepository } from '../../../../../infra/db/dynamodb/membership/membership-dynamodb-repository'

export const makeDbAddMembership = (): DbAddMembership => {
  const dynamoClient = DynamoDBClientFactory({ apiVersion: '2012-08-10' })
  const userRepository = new UserDynamoDbRepository(dynamoClient)
  const organizationRepository = new OrganizationDynamodbRepository(dynamoClient)
  const membershipRepository = new MembershipDynamodbRepository(dynamoClient)
  return new DbAddMembership(userRepository, organizationRepository, membershipRepository)
}
