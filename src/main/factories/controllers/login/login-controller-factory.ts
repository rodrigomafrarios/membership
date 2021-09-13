import { Controller } from '../../../../presentation/interfaces/controller'
import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { makeDbLogin } from '../../usecases/login/db-login-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
	return new LoginController(makeDbLogin(), makeLoginValidation())
}
