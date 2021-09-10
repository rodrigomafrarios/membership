import 'source-map-support/register'

import { makeOrgUserAuthController } from '../../../../factories/controllers/auth/auth-controller-factory'
import { HttpRequest } from '../../../../../presentation/interfaces/http'

const orgUserAuth = async (event: any) => {
  const controller = makeOrgUserAuthController()
  const httpRequest: HttpRequest = {
    body: {
      accessToken: event.authorizationToken,
      methodArn: event.methodArn
    }
  }
  const policy = await controller.handle(httpRequest)
  return policy
}

export const handler = orgUserAuth
