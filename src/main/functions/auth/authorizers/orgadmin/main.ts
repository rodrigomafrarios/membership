import 'source-map-support/register'

import { makeOrgAdminAuthController } from '../../../../factories/controllers/auth/auth-controller-factory'
import { HttpRequest } from '../../../../../presentation/interfaces/http'

const orgAdminAuth = async (event: any) => {
  const controller = makeOrgAdminAuthController()
  const httpRequest: HttpRequest = {
    body: {
      accessToken: event.authorizationToken,
      methodArn: event.methodArn
    }
  }
  const policy = await controller.handle(httpRequest)
  return policy
}

export const handler = orgAdminAuth
