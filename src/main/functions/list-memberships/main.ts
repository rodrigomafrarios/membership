import 'source-map-support/register'
import { lambdaAdapt } from '../../adapters/lambda-adapter'
import { makeListMembershipsController } from '../../factories/controllers/membership/list-memberships/list-memberships-controller-factory'

const listMemberships = async (event) => {
  const controller = makeListMembershipsController()
  const httpResponse = lambdaAdapt(controller)({
    body: {
      organizationId: event.pathParameters.organizationId
    }
  })
  return httpResponse
}

export const handler = listMemberships
