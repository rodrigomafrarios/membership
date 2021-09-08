import { DbLoadUser } from '../../../../../data/usecases/user/load-user/db-load-user'
import { LoadUser } from '../../../../../domain/usecases/user/load-user/load-user'
import { DynamoDBClientFactory } from '../../../../../infra/aws/factories/aws-config-factory'
import { UserDynamoDbRepository } from '../../../../../infra/db/dynamodb/user/user-dynamodb-repository'

export const makeLoadUser = (): LoadUser => {
  const dynamoClient = DynamoDBClientFactory({ apiVersion: '2012-08-10' })
  const userRepository = new UserDynamoDbRepository(dynamoClient)
  return new DbLoadUser(userRepository)
}
