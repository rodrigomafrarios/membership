import { AddOrganizationParams } from '../../../../domain/usecases/organization/add-organization/add-organization'

export interface AddOrganizationRepository {
  add: (addOrganizationParams: AddOrganizationParams) => Promise<boolean>
}
