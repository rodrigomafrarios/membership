import { OrganizationModel } from '../../../../domain/models/organization'

export interface ListOrganizationsRepository {
  list: () => Promise<OrganizationModel[]>
}
