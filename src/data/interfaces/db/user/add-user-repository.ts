import { UserModel } from '../../../../domain/models/user'
import { AddUserParams } from '../../../../domain/usecases/user/add-user/add-user'

export interface AddUserRepository {
	add: (UserData: AddUserParams) => Promise<UserModel>
}
