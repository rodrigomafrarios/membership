import { UserWithoutCredentials } from '../../../models/user'

export interface ListUsers {
  list: () => Promise<UserWithoutCredentials[]>
}
