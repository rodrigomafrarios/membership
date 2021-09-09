import 'source-map-support/register'
import { lambdaAdapt } from '../../adapters/lambda-adapter'
import { makeAddMembershipController } from '../../factories/controllers/membership/add-membership/add-membership-controller-factory'

const addMembership = async (event) => {
  const controller = makeAddMembershipController()
  const httpResponse = lambdaAdapt(controller)({
    body: event.body
  })
  return httpResponse
}

export const handler = addMembership
