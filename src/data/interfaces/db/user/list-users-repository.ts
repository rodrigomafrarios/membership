import { UserWithoutCredentials } from '../../../../domain/models/user'

export interface ListUsersRepository {
  list: () => Promise<UserWithoutCredentials[]>
}
