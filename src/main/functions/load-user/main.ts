import { makeLoadUserController } from '../../factories/controllers/user/load-user/load-user-controller-factory'
import 'source-map-support/register'

import { lambdaAdapt } from '../../adapters/lambda-adapter'

const loadUser = async (event) => {
  const controller = makeLoadUserController()
  const httpResponse = lambdaAdapt(controller)({
    body: {
      id: event.pathParameters.userId
    }
  })
  return httpResponse
}

export const handler = loadUser
