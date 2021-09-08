import { UserModel, UserWithoutCredentials } from '../../../../domain/models/user'

export interface LoadUserByIdRepository {
  loadById: (id: UserModel['id']) => Promise<UserWithoutCredentials>
}
