import { Controller } from '../../../../../presentation/interfaces/controller'
import { makeAddUserValidation } from './add-user-validation-factory'
import { AddUserController } from '../../../../../presentation/controllers/user/add-user/add-user-controller'
import { makeDbLogin } from '../../../usecases/login/db-login-factory'
import { makeAddUser } from '../../../usecases/user/add-user/add-user-factory'

export const makeAddUserController = (): Controller => {
  const controller = new AddUserController(makeAddUserValidation(), makeAddUser(), makeDbLogin())
  return controller
}
