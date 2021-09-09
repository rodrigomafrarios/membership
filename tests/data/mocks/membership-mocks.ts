import { AddMembershipRepository, AddMembershipRepositoryParams } from '@/data/interfaces/db/membership/add-membership/add-membership-repository'
import { AddMembershipParams } from '@/domain/usecases/membership/add-membership/add-membership'
import { mockOrganization } from '@/tests/presentation/mocks/organization-mocks'
import { mockUser } from './user-mocks'

const user = mockUser()
const organization = mockOrganization()

export const mockAddMembershipParams = (): AddMembershipParams => ({
  userId: user.id,
  organizationId: organization.organizationId
})

export const mockAddMembershipRepositoryParams = (): AddMembershipRepositoryParams => ({
  userId: user.id,
  userName: user.name,
  userEmail: user.email,
  userRole: user.role,
  organizationId: organization.organizationId,
  organizationName: organization.name
})

export const mockAddMembershipRepository = (): AddMembershipRepository => {
  class AddMembershipRepositoryStub implements AddMembershipRepository {
    async add (addMembershipRepositoryParams: AddMembershipRepositoryParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new AddMembershipRepositoryStub()
}
