import { UserModel, UserWithoutCredentials } from '../../../models/user'

export interface LoadUser {
  loadById: (id: UserModel['id']) => Promise<UserWithoutCredentials>
}
