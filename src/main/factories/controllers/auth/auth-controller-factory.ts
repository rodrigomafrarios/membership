
import { AuthController } from '../../../../presentation/controllers/auth/auth-controller'
import { makeOrgAdminAWSAuthorizer, makeOrgUserAWSAuthorizer, makeSysAdminAWSAuthorizer, makeUserAWSAuthorizer } from '../../usecases/auth/auth-factory'
import { makeAuthValidation } from './auth-validation-factory'

export const makeSysAdminAuthController = () => {
  const controller = new AuthController(makeAuthValidation(), makeSysAdminAWSAuthorizer())
  return controller
}

export const makeOrgAdminAuthController = () => {
  const controller = new AuthController(makeAuthValidation(), makeOrgAdminAWSAuthorizer())
  return controller
}

export const makeOrgUserAuthController = () => {
  const controller = new AuthController(makeAuthValidation(), makeOrgUserAWSAuthorizer())
  return controller
}

export const makeUserAuthController = () => {
  const controller = new AuthController(makeAuthValidation(), makeUserAWSAuthorizer())
  return controller
}
