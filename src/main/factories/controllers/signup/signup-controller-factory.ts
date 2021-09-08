import { Controller } from '../../../../presentation/interfaces/controller'
import { makeSignupValidation } from './signup-validation-factory'
import { SignupController } from '../../../../presentation/controllers/signup/signup-controller'
import { makeDbLogin } from '../../usecases/login/db-login-factory'
import { makeAddUser } from '../../usecases/user/add-user/add-user-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignupController(makeSignupValidation(), makeAddUser(), makeDbLogin())
  return controller
}
