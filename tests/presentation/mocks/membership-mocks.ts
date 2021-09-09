import { MembershipModel } from '@/domain/models/membership'
import { AddMembership, AddMembershipParams } from '@/domain/usecases/membership/add-membership/add-membership'
import { ListMemberships } from '@/domain/usecases/membership/list-memberships/list-memberships'
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

export const mockListMembershipsRequest = (): HttpRequest => ({
  body: {
    organizationId: organization.organizationId
  }
})

export const mockListMembership = (): MembershipModel => ({
  id: 'any-membership-id',
  userId: user.id,
  userName: user.name,
  userEmail: user.email,
  userRole: user.role,
  organizationId: organization.organizationId,
  organizationName: organization.name
})

export const mockAddMembership = (): AddMembership => {
  class AddMembershipStub implements AddMembership {
    async add (addMembershipParams: AddMembershipParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new AddMembershipStub()
}

export const mockListMemberships = (): ListMemberships => {
  class ListMembershipsStub implements ListMemberships {
    async listByOrganizationId (): Promise<MembershipModel[]> {
      return Promise.resolve([mockListMembership()])
    }
  }
  return new ListMembershipsStub()
}
