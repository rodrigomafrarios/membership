import { OrganizationModel } from '@/domain/models/organization'
import { AddOrganization, AddOrganizationParams } from '@/domain/usecases/organization/add-organization/add-organization'
import { ListOrganizations } from '@/domain/usecases/organization/list-organizations/list-organizations'

export const mockAddOrganizationParams = (): AddOrganizationParams => ({
  organizationId: 'any-org-id',
  name: 'any-name'
})

export const mockOrganization = (): OrganizationModel => ({
  id: 'any-id',
  organizationId: 'any-org-id',
  name: 'any-org-name'
})

export const mockAddOrganization = (): AddOrganization => {
  class AddOrganizationStub implements AddOrganization {
    async add (addOrganizationParams: AddOrganizationParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new AddOrganizationStub()
}

export const mockListOrganizations = (): ListOrganizations => {
  class ListOrganizationsStub implements ListOrganizations {
    async list (): Promise<OrganizationModel[]> {
      return Promise.resolve([mockOrganization()])
    }
  }
  return new ListOrganizationsStub()
}
