import { MembershipModel } from '../../../models/membership'

export interface ListMemberships {
  listByOrganizationId: (organizatonId: MembershipModel['organizationId']) => Promise<MembershipModel[]>
}
