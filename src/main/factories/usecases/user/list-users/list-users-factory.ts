import { DbListUsers } from '../../../../../data/usecases/user/list-users/db-list-users'
import { ListUsers } from '../../../../../domain/usecases/user/list-users/list-users'
import { DynamoDBClientFactory } from '../../../../../infra/aws/factories/aws-config-factory'
import { UserDynamoDbRepository } from '../../../../../infra/db/dynamodb/user/user-dynamodb-repository'

export const makeListUsers = (): ListUsers => {
  const dynamoClient = DynamoDBClientFactory({ apiVersion: '2012-08-10' })
  const userRepository = new UserDynamoDbRepository(dynamoClient)
  return new DbListUsers(userRepository)
}
