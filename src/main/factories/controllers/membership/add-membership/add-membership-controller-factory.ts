import { makeDbAddMembership } from '../../../usecases/membership/add-membership/add-membership-factory'
import { AddMembershipController } from '../../../../../presentation/controllers/membership/add-membership/add-membership-controller'
import { makeAddMembershipValidation } from './add-membership-validation-factory'

export const makeAddMembershipController = (): AddMembershipController => {
  return new AddMembershipController(makeAddMembershipValidation(), makeDbAddMembership())
}
