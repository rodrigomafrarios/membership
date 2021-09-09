import { MembershipModel } from '../../../../../domain/models/membership'
import { OrganizationModel } from '../../../../../domain/models/organization'

export interface ListMembershipsRepository {
  listByOrganizationId: (organizationId: OrganizationModel['organizationId']) => Promise<MembershipModel[]>
}
