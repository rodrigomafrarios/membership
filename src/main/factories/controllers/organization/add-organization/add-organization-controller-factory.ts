import { makeDbAddOrganization } from '../../../../factories/usecases/organization/add-organization/add-organization-factory'
import { AddOrganizationController } from '../../../../../presentation/controllers/organization/add-organization/add-organization-controller'
import { makeAddOrganizationValidation } from './add-organization-validation-factory'

export const makeAddOrganizationController = (): AddOrganizationController => {
  return new AddOrganizationController(makeAddOrganizationValidation(), makeDbAddOrganization())
}
