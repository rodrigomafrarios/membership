import { AddOrganizationParams } from '../../../../domain/usecases/organization/add-organization/add-organization'
import { AddOrganizationRepository } from '../../../../data/interfaces/db/organization/add-organization-repository'
import * as Dynamodb from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

export class OrganizationDynamodbRepository implements AddOrganizationRepository {
  constructor (private readonly client: Dynamodb.DocumentClient) {}

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
    console.log(response)
    if (response.$response.error) {
      return false
    }
    return true
  }
}
