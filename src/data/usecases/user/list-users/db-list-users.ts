import { ListUsersRepository } from '../../../../data/interfaces/db/user/list-users-repository'
import { UserModel } from '../../../../domain/models/user'
import { ListUsers } from '../../../../domain/usecases/user/list-users/list-users'

export class DbListUsers implements ListUsers {
  constructor (private readonly listUsersRepository: ListUsersRepository) {}

  async list (): Promise<UserModel[]> {
    const users = await this.listUsersRepository.list()
    return users
  }
}
