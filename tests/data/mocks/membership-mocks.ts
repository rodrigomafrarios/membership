import { LoadMembershipParams, LoadMembershipRepository } from '@/data/interfaces/db/membership/load-membership/load-membership-repository'
import { AddMembershipRepository, AddMembershipRepositoryParams } from '@/data/interfaces/db/membership/add-membership/add-membership-repository'
import { AddMembershipParams } from '@/domain/usecases/membership/add-membership/add-membership'
import { mockOrganization } from '@/tests/presentation/mocks/organization-mocks'
import { ListMembershipsRepository } from '@/data/interfaces/db/membership/list-memberships/list-memberships-repository'
import { mockUser } from './user-mocks'
import { MembershipModel } from '@/domain/models/membership'

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

export const mockMembership = (): MembershipModel => ({
  id: 'any-id',
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

export const mockListMembershipsRepository = (): ListMembershipsRepository => {
  class ListMembershipsRepositoryStub implements ListMembershipsRepository {
    async listByOrganizationId (organizationId: string): Promise<MembershipModel[]> {
      return Promise.resolve([mockMembership()])
    }
  }
  return new ListMembershipsRepositoryStub()
}

export const mockLoadMembershipByUserOrganizationRepository = (): LoadMembershipRepository => {
  class LoadMembershipRepositoryStub implements LoadMembershipRepository {
    async loadByUserOrganization (loadParams: LoadMembershipParams): Promise<MembershipModel> {
      return Promise.resolve(null)
    }
  }
  return new LoadMembershipRepositoryStub()
}
