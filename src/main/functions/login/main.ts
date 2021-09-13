import 'source-map-support/register'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway'

import schema from './schema'
import { lambdaAdapt } from '../../adapters/lambda-adapter'
import { makeLoginController } from '../../factories/controllers/login/login-controller-factory'

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { body } = event
  const controller = makeLoginController()
  const httpResponse = lambdaAdapt(controller)({
    body
  })
  return httpResponse
}

export const handler = login
