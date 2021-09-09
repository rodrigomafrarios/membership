import { LoadOrganizationController } from '../../../../../presentation/controllers/organization/load-organization/load-organization-controller'
import { makeDbLoadOrganization } from '../../../../factories/usecases/organization/load-organization/load-organization-factory'

export const makeLoadOrganizationController = (): LoadOrganizationController => {
  return new LoadOrganizationController(makeDbLoadOrganization())
}
