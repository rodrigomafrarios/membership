import { AddOrganizationRepository } from '@/data/interfaces/db/organization/add-organization-repository'
import { AddOrganizationParams } from '@/domain/usecases/organization/add-organization/add-organization'

export const mockAddOrganizationRepository = (): AddOrganizationRepository => {
  class AddOrganizationRepositoryStub implements AddOrganizationRepository {
    async add (addOrganizationParams: AddOrganizationParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new AddOrganizationRepositoryStub()
}
