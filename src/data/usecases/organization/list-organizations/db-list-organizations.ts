import { ListOrganizationsRepository } from '../../../interfaces/db/organization/list-organizations-repository'
import { OrganizationModel } from '../../../../domain/models/organization'
import { ListOrganizations } from '../../../../domain/usecases/organization/list-organizations/list-organizations'

export class DbListOrganizations implements ListOrganizations {
  constructor (private readonly listOrganizationsRepository: ListOrganizationsRepository) {}

  async list (): Promise<OrganizationModel[]> {
    const organizations = await this.listOrganizationsRepository.list()
    return organizations
  }
}
