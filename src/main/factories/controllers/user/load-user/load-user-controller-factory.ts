import { makeLoadUser } from '../../../../factories/usecases/user/load-user/load-user-factory'
import { LoadUserController } from '../../../../../presentation/controllers/user/load-user/load-user-controller'

export const makeLoadUserController = (): LoadUserController => {
  return new LoadUserController(makeLoadUser())
}
