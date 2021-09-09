import { makeDbListMemberships } from '../../../usecases/membership/list-memberships/list-memberships-factory'
import { ListMembershipsController } from '../../../../../presentation/controllers/membership/list-memberships/list-memberships-controller'

export const makeListMembershipsController = (): ListMembershipsController => {
  return new ListMembershipsController(makeDbListMemberships())
}
