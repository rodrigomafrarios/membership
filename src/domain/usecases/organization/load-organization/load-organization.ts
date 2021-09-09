import { OrganizationModel } from '../../../../domain/models/organization'

export interface LoadOrganization {
  load: (organizationId: OrganizationModel['organizationId']) => Promise<OrganizationModel>
}
