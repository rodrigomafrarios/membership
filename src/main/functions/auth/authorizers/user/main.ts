import 'source-map-support/register'

import { makeUserAuthController } from '../../../../factories/controllers/auth/auth-controller-factory'
import { HttpRequest } from '../../../../../presentation/interfaces/http'

const userAuth = async (event: any) => {
  const controller = makeUserAuthController()
  const httpRequest: HttpRequest = {
    body: {
      accessToken: event.authorizationToken,
      methodArn: event.methodArn
    }
  }
  const policy = await controller.handle(httpRequest)
  return policy
}

export const handler = userAuth
