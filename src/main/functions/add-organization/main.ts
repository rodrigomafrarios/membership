import 'source-map-support/register'
import { makeAddOrganizationController } from '../../factories/controllers/organization/add-organization/add-organization-controller-factory'
import { lambdaAdapt } from '../../adapters/lambda-adapter'

const addOrganization = async (event) => {
  const controller = makeAddOrganizationController()
  const httpResponse = lambdaAdapt(controller)({
    body: event.body
  })
  return httpResponse
}

export const handler = addOrganization
