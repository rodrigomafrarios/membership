import 'source-map-support/register'
import { lambdaAdapt } from '../../adapters/lambda-adapter'
import { makeListOrganizationsController } from '../../factories/controllers/organization/list-organizations/list-organizations-controller-factory'

const listOrganizations = async (event) => {
  const controller = makeListOrganizationsController()
  const httpResponse = lambdaAdapt(controller)({
    body: event.body
  })
  return httpResponse
}

export const handler = listOrganizations
