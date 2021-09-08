import 'source-map-support/register'

import { makeListUsersController } from '../../factories/controllers/user/list-users/list-users-controller-factory'
import { lambdaAdapt } from '../../adapters/lambda-adapter'

const listUsers = async (event) => {
  const controller = makeListUsersController()
  const httpResponse = lambdaAdapt(controller)({})
  return httpResponse
}

export const handler = listUsers
