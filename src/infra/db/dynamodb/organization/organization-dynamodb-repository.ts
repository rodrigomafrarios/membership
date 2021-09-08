import { AddOrganizationParams } from '../../../../domain/usecases/organization/add-organization/add-organization'
import { AddOrganizationRepository } from '../../../../data/interfaces/db/organization/add-organization-repository'
import { OrganizationModel } from '../../../../domain/models/organization'
import { ListOrganizationsRepository } from '../../../../data/interfaces/db/organization/list-organizations-repository'
import * as Dynamodb from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

export class OrganizationDynamodbRepository implements AddOrganizationRepository, ListOrganizationsRepository {
  constructor (private readonly client: Dynamodb.DocumentClient) {}

  async list (): Promise<OrganizationModel[]> {
    const output = await this.client.scan({
      TableName: process.env.DYNAMODB_TABLE_ORGANIZATIONS
    }).promise()
    if (output?.Items.length) {
      const organizations: OrganizationModel[] = output.Items.map((item, idx) => ({
        id: item.id,
        organizationId: item.organizationId,
        name: item.name
      }))
      return output?.Items && organizations
    }
    return []
  }

  async add (addOrganizationParams: AddOrganizationParams): Promise<boolean> {
    const response = await this.client.transactWrite({
      TransactItems: [{
        Put: {
          TableName: process.env.DYNAMODB_TABLE_ORGANIZATIONS,
          Item: {
            id: uuidv4(),
            ...addOrganizationParams
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
