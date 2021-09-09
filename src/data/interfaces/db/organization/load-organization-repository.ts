import { OrganizationModel } from '../../../../domain/models/organization'

export interface LoadOrganizationRepository {
  loadByOrganizationId: (organizationId: OrganizationModel['organizationId']) => Promise<OrganizationModel>
}
