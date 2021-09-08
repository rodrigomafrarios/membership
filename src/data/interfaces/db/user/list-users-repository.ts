import { UserModel } from '../../../../domain/models/user'

export interface ListUsersRepository {
  list: () => Promise<UserModel[]>
}
