import { makeListUsers } from '../../../../factories/usecases/user/list-users/list-users-factory'
import { ListUsersController } from '../../../../../presentation/controllers/user/list-users/list-users-controller'

export const makeListUsersController = (): ListUsersController => {
  return new ListUsersController(makeListUsers())
}
