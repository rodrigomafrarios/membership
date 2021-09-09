import { OrganizationModel } from './organization'
import { UserModel } from './user'

export interface MembershipModel {
  id: string
  userId: UserModel['id']
  userName: UserModel['name']
  userEmail: UserModel['email']
  userRole: UserModel['role']
  organizationId: OrganizationModel['id']
  organizationName: OrganizationModel['name']
}
