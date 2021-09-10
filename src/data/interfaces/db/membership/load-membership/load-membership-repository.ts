import { MembershipModel } from '../../../../../domain/models/membership'

export interface LoadMembershipParams {
  userId: MembershipModel['userId']
  organizationId: MembershipModel['organizationId']
}

export interface LoadMembershipRepository {
  loadByUserOrganization: (loadParams: LoadMembershipParams) => Promise<MembershipModel>
}
