import { LoadOrganizationRepository } from '@/data/interfaces/db/organization/load-organization-repository'
import { ListOrganizationsRepository } from '@/data/interfaces/db/organization/list-organizations-repository'
import { AddOrganizationRepository } from '@/data/interfaces/db/organization/add-organization-repository'
import { AddOrganizationParams } from '@/domain/usecases/organization/add-organization/add-organization'
import { OrganizationModel } from '@/domain/models/organization'
import { mockOrganization } from '@/tests/presentation/mocks/organization-mocks'

export const mockAddOrganizationRepository = (): AddOrganizationRepository => {
  class AddOrganizationRepositoryStub implements AddOrganizationRepository {
    async add (addOrganizationParams: AddOrganizationParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new AddOrganizationRepositoryStub()
}

export const mockListOrganizationsRepository = (): ListOrganizationsRepository => {
  class ListOrganizationsRepositoryStub implements ListOrganizationsRepository {
    async list (): Promise<OrganizationModel[]> {
      return Promise.resolve([mockOrganization()])
    }
  }
  return new ListOrganizationsRepositoryStub()
}

export const mockLoadOrganizationRepository = (): LoadOrganizationRepository => {
  class LoadOrganizationRepositoryStub implements LoadOrganizationRepository {
    async loadByOrganizationId (): Promise<OrganizationModel> {
      return Promise.resolve(mockOrganization())
    }
  }
  return new LoadOrganizationRepositoryStub()
}
