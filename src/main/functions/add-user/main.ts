import 'source-map-support/register'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway'

import schema from './schema'
import { lambdaAdapt } from '../../adapters/lambda-adapter'
import { makeAddUserController } from '../../factories/controllers/user/add-user/add-user-controller-factory'

const addUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { body } = event
  const controller = makeAddUserController()
  const httpResponse = lambdaAdapt(controller)({
    body
  })
  return httpResponse
}

export const handler = addUser
