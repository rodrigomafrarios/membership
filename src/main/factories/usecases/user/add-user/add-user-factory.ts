import { DbAddUser } from '../../../../../data/usecases/user/add-user/db-add-user'
import { AddUser } from '../../../../../domain/usecases/user/add-user/add-user'
import { DynamoDBClientFactory } from '../../../../../infra/aws/factories/aws-config-factory'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { UserDynamoDbRepository } from '../../../../../infra/db/dynamodb/user/user-dynamodb-repository'

export const makeAddUser = (): AddUser => {
  const salt = 12
	const bcryptAdapter = new BcryptAdapter(salt)
  const dynamoClient = DynamoDBClientFactory({ apiVersion: '2012-08-10' })
  const userRepository = new UserDynamoDbRepository(dynamoClient)
  return new DbAddUser(userRepository, userRepository, bcryptAdapter)
}
