import { UserModel } from '@/domain/models/user'
import { AddUser } from '@/domain/usecases/user/add-user/add-user'

export const mockUser = (): UserModel => {
  return {
    id: 'any_id',
    email: 'any_email@mail.com',
    password: 'any_password',
    name: 'any_name'
  }
}

export const mockAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (): Promise<UserModel> {
      return Promise.resolve(mockUser())
    }
  }
  return new AddUserStub()
}
