import { AddMembership, AddMembershipParams } from '@/domain/usecases/membership/add-membership/add-membership'
import { HttpRequest } from '@/presentation/interfaces/http'
import { mockOrganization } from './organization-mocks'
import { mockUser } from './user-mocks'

const user = mockUser()
const organization = mockOrganization()

export const mockAddMembershipRequest = (): HttpRequest => ({
  body: {
    userId: user.id,
    organizationId: organization.organizationId
  }
})

export const mockAddMembership = (): AddMembership => {
  class AddMembershipStub implements AddMembership {
    async add (addMembershipParams: AddMembershipParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new AddMembershipStub()
}
