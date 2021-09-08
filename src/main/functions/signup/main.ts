import 'source-map-support/register'
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway'

import schema from './schema'
import { lambdaAdapt } from '../../adapters/lambda-adapter'
import { makeSignUpController } from '../../factories/controllers/signup/signup-controller-factory'

const signUp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { body } = event
  const controller = makeSignUpController()
  const httpResponse = lambdaAdapt(controller)(body)
  return httpResponse
}

export const handler = signUp
