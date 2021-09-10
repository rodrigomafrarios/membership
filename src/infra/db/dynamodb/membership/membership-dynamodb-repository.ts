import { AddMembershipRepository, AddMembershipRepositoryParams } from '../../../../data/interfaces/db/membership/add-membership/add-membership-repository'
import { ListMembershipsRepository } from '../../../../data/interfaces/db/membership/list-memberships/list-memberships-repository'
import { LoadMembershipParams, LoadMembershipRepository } from '../../../../data/interfaces/db/membership/load-membership/load-membership-repository'
import { MembershipModel } from '../../../../domain/models/membership'
import * as Dynamodb from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

export class MembershipDynamodbRepository implements AddMembershipRepository, ListMembershipsRepository, LoadMembershipRepository {
  constructor (private readonly client: Dynamodb.DocumentClient) {}

  async loadByUserOrganization (loadParams: LoadMembershipParams): Promise<MembershipModel> {
    const { organizationId, userId } = loadParams
    const output = await this.client.scan({
      TableName: process.env.DYNAMODB_TABLE_MEMBERSHIPS,
      FilterExpression: 'organizationId = :organizationId AND userId = :userId',
      ExpressionAttributeValues: {
        ':organizationId': organizationId,
        ':userId': userId
      }
    }).promise()
    return output?.Items.length > 0 && ({
      id: output?.Items[0].id,
      userId: output?.Items[0].userId,
      userName: output?.Items[0].userName,
      userEmail: output?.Items[0].userEmail,
      userRole: output?.Items[0].userRole,
      organizationId: output?.Items[0].organizationId,
      organizationName: output?.Items[0].organizationName
    })
  }

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
