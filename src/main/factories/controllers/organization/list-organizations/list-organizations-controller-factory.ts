import { makeDbListOrganizations } from '../../../../factories/usecases/organization/list-organizations/list-organizations-factory'
import { ListOrganizationsController } from '../../../../../presentation/controllers/organization/list-organizations/list-organizations-controller'

export const makeListOrganizationsController = (): ListOrganizationsController => {
  return new ListOrganizationsController(makeDbListOrganizations())
}
