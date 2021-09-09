import { MembershipModel } from '../../../../../domain/models/membership'

export type AddMembershipRepositoryParams = Omit<MembershipModel, 'id'>

export interface AddMembershipRepository {
  add: (addMembershipRepositoryParams: AddMembershipRepositoryParams) => Promise<boolean>
}
