import { AddUserRepository } from '../../../../data/interfaces/db/user/add-user-repository'
import { LoadUserByEmailRepository } from '../../../../data/interfaces/db/user/load-user-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/interfaces/db/user/update-access-token-repository'
import { ListUsersRepository } from '../../../../data/interfaces/db/user/list-users-repository'
import { UserModel } from '../../../../domain/models/user'
import { AddUserParams } from '../../../../domain/usecases/user/add-user/add-user'
import * as Dynamodb from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

export class UserDynamoDbRepository implements
ListUsersRepository,
LoadUserByEmailRepository,
AddUserRepository,
UpdateAccessTokenRepository {
  constructor (private readonly client: Dynamodb.DocumentClient) {}
  async list (): Promise<UserModel[]> {
    const output = await this.client.scan({
      TableName: process.env.DYNAMODB_TABLE_USERS
    }).promise()
    if (output?.Items.length) {
      const users: UserModel[] = output.Items.map((item, idx) => ({
        id: item.id,
        email: item.email,
        password: item.password,
        name: item.name,
        role: item.role
      }))
      return output?.Items && users
    }
    return []
  }

  async loadByEmail (email: string): Promise<UserModel> {
    const output = await this.client.get({
      TableName: process.env.DYNAMODB_TABLE_USERS,
      Key: {
        email
      }
    }).promise()

    return output?.Item && ({
      id: output.Item.id,
      email: output.Item.email,
      password: output.Item.password,
      name: output.Item.name,
      role: output.Item.role
    })
  }

  async updateAccessToken (email: string, token: string): Promise<void> {
    await this.client.transactWrite({
      TransactItems: [{
        Update: {
          TableName: process.env.DYNAMODB_TABLE_USERS,
          Key: {
            email
          },
          UpdateExpression: 'SET accessToken = :token',
          ExpressionAttributeValues: {
            ':token': token
          }
        }
      }]
    }).promise()
  }

  async add (addUserParams: AddUserParams): Promise<any> {
    await this.client.transactWrite({
      TransactItems: [{
        Put: {
          TableName: process.env.DYNAMODB_TABLE_USERS,
          Item: {
            id: uuidv4(),
            ...addUserParams
          }
        }
      }]
    }).promise()
    return await this.loadByEmail(addUserParams.email)
  }
}
