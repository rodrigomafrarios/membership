import { LoadOrganizationRepository } from '../../../interfaces/db/organization/load-organization-repository'
import { OrganizationModel } from '../../../../domain/models/organization'
import { LoadOrganization } from '../../../../domain/usecases/organization/load-organization/load-organization'

export class DbLoadOrganization implements LoadOrganization {
  constructor (private readonly loadOrganizationRepository: LoadOrganizationRepository) {}

  async load (organizationId: OrganizationModel['organizationId']): Promise<OrganizationModel> {
    const organization = await this.loadOrganizationRepository.loadByOrganizationId(organizationId)
    return organization
  }
}
