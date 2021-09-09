import { ListMembershipsRepository } from '../../../interfaces/db/membership/list-memberships/list-memberships-repository'
import { MembershipModel } from '../../../../domain/models/membership'
import { ListMemberships } from '../../../../domain/usecases/membership/list-memberships/list-memberships'

export class DbListMemberships implements ListMemberships {
  constructor (private readonly listMembershipsRepository: ListMembershipsRepository) {}

  async listByOrganizationId (organizationId: MembershipModel['organizationId']): Promise<MembershipModel[]> {
    const memberships = await this.listMembershipsRepository.listByOrganizationId(organizationId)
    return memberships
  }
}
