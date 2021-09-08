import { Hasher } from '../../../interfaces/criptography/hasher'
import { AddUserRepository } from '../../../interfaces/db/user/add-user-repository'
import { LoadUserByEmailRepository } from '../../../interfaces/db/user/load-user-by-email-repository'
import { UserModel } from '../../../../domain/models/user'
import { AddUser, AddUserParams } from '../../../../domain/usecases/user/add-user/add-user'

export class DbAddUser implements AddUser {
  constructor (
    private readonly addUserRepository: AddUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async add (userParams: AddUserParams): Promise<UserModel> {
    const user = await this.loadUserByEmailRepository.loadByEmail(userParams.email)
    if (!user) {
      const hashedPassword = await this.hasher.hash(userParams.password)
      const addUserParams = Object.assign({}, userParams, { password: hashedPassword })
      const newUser = await this.addUserRepository.add(addUserParams)
      return newUser
    }
    return null
  }
}
