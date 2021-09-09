import { AddMembershipRepository, AddMembershipRepositoryParams } from '../../../../data/interfaces/db/membership/add-membership/add-membership-repository'
import * as Dynamodb from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

export class MembershipDynamodbRepository implements AddMembershipRepository {
  constructor (private readonly client: Dynamodb.DocumentClient) {}

  async add (addMembershipRepositoryParams: AddMembershipRepositoryParams): Promise<boolean> {
    const response = await this.client.transactWrite({
      TransactItems: [{
        Put: {
          TableName: process.env.DYNAMODB_TABLE_MEMBERSHIPS,
          Item: {
            id: uuidv4(),
            ...addMembershipRepositoryParams
          }
        }
      }]
    }).promise()
    if (response.$response.error) {
      return false
    }
    return true
  }
}
