import { OrganizationModel } from '@/domain/models/organization'
import { AddOrganization, AddOrganizationParams } from '@/domain/usecases/organization/add-organization/add-organization'
import { ListOrganizations } from '@/domain/usecases/organization/list-organizations/list-organizations'
import { LoadOrganization } from '@/domain/usecases/organization/load-organization/load-organization'
import { HttpRequest } from '@/presentation/interfaces/http'

export const mockAddOrganizationRequest = (): HttpRequest => ({
  body: {
    organizationId: '123',
    name: 'any-name'
  }
})

export const mockAddOrganizationParams = (): AddOrganizationParams => ({
  organizationId: '123',
  name: 'any-name'
})

export const mockOrganization = (): OrganizationModel => ({
  id: 'any-id',
  organizationId: '123',
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

export const mockLoadOrganization = (): LoadOrganization => {
  class LoadOrganizationStub implements LoadOrganization {
    async load (): Promise<OrganizationModel> {
      return Promise.resolve(mockOrganization())
    }
  }
  return new LoadOrganizationStub()
}
