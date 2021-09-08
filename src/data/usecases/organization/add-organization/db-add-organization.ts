import { AddOrganizationRepository } from '../../../../data/interfaces/db/organization/add-organization-repository'
import { AddOrganization, AddOrganizationParams } from '../../../../domain/usecases/organization/add-organization/add-organization'

export class DbAddOrganization implements AddOrganization {
  constructor (private readonly addOrganizationRepository: AddOrganizationRepository) {}

  async add (addOrganizationParams: AddOrganizationParams): Promise<boolean> {
    const saved = await this.addOrganizationRepository.add(addOrganizationParams)
    return saved
  }
}
