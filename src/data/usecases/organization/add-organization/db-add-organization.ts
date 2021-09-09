import { LoadOrganizationRepository } from '../../../../data/interfaces/db/organization/load-organization-repository'
import { AddOrganizationRepository } from '../../../../data/interfaces/db/organization/add-organization-repository'
import { AddOrganization, AddOrganizationParams } from '../../../../domain/usecases/organization/add-organization/add-organization'

export class DbAddOrganization implements AddOrganization {
  constructor (
    private readonly loadOrganizationByIdRepository: LoadOrganizationRepository,
    private readonly addOrganizationRepository: AddOrganizationRepository
  ) {}

  async add (addOrganizationParams: AddOrganizationParams): Promise<boolean> {
    const organization = await this.loadOrganizationByIdRepository.loadByOrganizationId(addOrganizationParams.organizationId)
    if (organization) {
      return false
    }
    const saved = await this.addOrganizationRepository.add(addOrganizationParams)
    return saved
  }
}
