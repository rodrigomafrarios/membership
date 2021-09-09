import { AddMembershipRepository, AddMembershipRepositoryParams } from '../../../../data/interfaces/db/membership/add-membership/add-membership-repository'
import { ListMembershipsRepository } from '../../../../data/interfaces/db/membership/list-memberships/list-memberships-repository'
import { MembershipModel } from '../../../../domain/models/membership'
import * as Dynamodb from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

export class MembershipDynamodbRepository implements AddMembershipRepository, ListMembershipsRepository {
  constructor (private readonly client: Dynamodb.DocumentClient) {}

  async listByOrganizationId (organizationId: MembershipModel['organizationId']): Promise<MembershipModel[]> {
    const output = await this.client.scan({
      TableName: process.env.DYNAMODB_TABLE_MEMBERSHIPS,
      FilterExpression: 'organizationId = :organizationId',
      ExpressionAttributeValues: {
        ':organizationId': organizationId
      }
    }).promise()
    if (output?.Items.length) {
      return output?.Items as MembershipModel[]
    }
    return []
  }

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
