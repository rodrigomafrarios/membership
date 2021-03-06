import { AddMembershipRepository } from '../../../interfaces/db/membership/add-membership/add-membership-repository'
import { AddMembership, AddMembershipParams } from '../../../../domain/usecases/membership/add-membership/add-membership'
import { LoadUserByIdRepository } from '../../../interfaces/db/user/load-user-by-id-repository'
import { LoadOrganizationRepository } from '../../../interfaces/db/organization/load-organization-repository'
import { LoadMembershipRepository } from '../../../interfaces/db/membership/load-membership/load-membership-repository'

export class DbAddMembership implements AddMembership {
  constructor (
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly loadOrganizationByIdRepository: LoadOrganizationRepository,
    private readonly loadMembershipByUserOrganizationRepository: LoadMembershipRepository,
    private readonly addMembershipRepository: AddMembershipRepository
  ) {}

  async add (addMembershipParams: AddMembershipParams): Promise<boolean> {
    let created = false
    const { userId, organizationId } = addMembershipParams
    const user = await this.loadUserByIdRepository.loadById(userId)
    const organization = await this.loadOrganizationByIdRepository.loadByOrganizationId(organizationId)
    if (user && organization) {
      const membership = await this.loadMembershipByUserOrganizationRepository.loadByUserOrganization({
        userId,
        organizationId
      })
      if (membership) {
        return created
      }
      created = await this.addMembershipRepository.add({
        userId,
        userName: user.name,
        userEmail: user.email,
        userRole: user.role,
        organizationId,
        organizationName: organization.name
      })
    }
    return created
  }
}
