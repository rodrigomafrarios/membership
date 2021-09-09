import { OrganizationModel } from '../../../../../domain/models/organization'
import { UserModel } from '../../../../../domain/models/user'

export interface AddMembershipRepositoryParams {
  userId: UserModel['id']
  userName: UserModel['name']
  userEmail: UserModel['email']
  userRole: UserModel['role']
  organizationId: OrganizationModel['id']
  organizationName: OrganizationModel['name']
}

export interface AddMembershipRepository {
  add: (addMembershipRepositoryParams: AddMembershipRepositoryParams) => Promise<boolean>
}
