import { OrganizationModel } from '../../../models/organization'

export interface ListOrganizations {
  list: () => Promise<OrganizationModel[]>
}
