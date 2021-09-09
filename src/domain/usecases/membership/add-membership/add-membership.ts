import { OrganizationModel } from '../../../models/organization'
import { UserModel } from '../../../models/user'

export interface AddMembershipParams {
  userId: UserModel['id']
  organizationId: OrganizationModel['id']
}

export interface AddMembership {
  add: (addMembershipParams: AddMembershipParams) => Promise<boolean>
}
