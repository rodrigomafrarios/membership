import 'source-map-support/register'

import { makeSysAdminAuthController } from '../../../../factories/controllers/auth/auth-controller-factory'
import { HttpRequest } from '../../../../../presentation/interfaces/http'

const sysAdminAuth = async (event: any) => {
  const controller = makeSysAdminAuthController()
  const httpRequest: HttpRequest = {
    body: {
      accessToken: event.authorizationToken,
      methodArn: event.methodArn
    }
  }
  const policy = await controller.handle(httpRequest)
  return policy
}

export const handler = sysAdminAuth
