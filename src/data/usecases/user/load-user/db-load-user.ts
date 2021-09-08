import { LoadUserByIdRepository } from '../../../interfaces/db/user/load-user-by-id-repository'
import { UserModel, UserWithoutCredentials } from '../../../../domain/models/user'
import { LoadUser } from '../../../../domain/usecases/user/load-user/load-user'

export class DbLoadUser implements LoadUser {
  constructor (private readonly loadUserByIdRepository: LoadUserByIdRepository) {}

  async loadById (id: UserModel['id']): Promise<UserWithoutCredentials> {
    const user = await this.loadUserByIdRepository.loadById(id)
    return user
  }
}
