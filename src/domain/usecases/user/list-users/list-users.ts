import { UserModel } from '../../../models/user'

export interface ListUsers {
  list: () => Promise<UserModel[]>
}
