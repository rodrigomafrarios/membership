import 'source-map-support/register'
import { lambdaAdapt } from '../../adapters/lambda-adapter'
import { makeLoadOrganizationController } from '../../factories/controllers/organization/load-organization/load-organization-controller-factory'

const loadOrganization = async (event) => {
  const controller = makeLoadOrganizationController()
  const httpResponse = lambdaAdapt(controller)({
    body: {
      organizationId: event.pathParameters.organizationId
    }
  })
  return httpResponse
}

export const handler = loadOrganization
