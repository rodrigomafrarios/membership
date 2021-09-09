import { UserModel, UserRole } from '@/domain/models/user'
import { ListUsers } from '@/domain/usecases/user/list-users/list-users'
import { AddUser } from '@/domain/usecases/user/add-user/add-user'
import { LoadUser } from '@/domain/usecases/user/load-user/load-user'

export const mockUser = (): UserModel => {
  return {
    id: 'any_id',
    email: 'any_email@mail.com',
    password: 'any_password',
    name: 'any_name',
    role: UserRole.sysadmin
  }
}

export const mockAddUserStub = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (): Promise<UserModel> {
      return Promise.resolve(mockUser())
    }
  }
  return new AddUserStub()
}

export const mockListUsersStub = (): ListUsers => {
  class ListUsersStub implements ListUsers {
    async list (): Promise<UserModel[]> {
      return Promise.resolve([mockUser()])
    }
  }
  return new ListUsersStub()
}

export const mockLoadUserStub = (): LoadUser => {
  class LoadUserStub implements LoadUser {
    async loadById (id: UserModel['id']): Promise<UserModel> {
      return Promise.resolve(mockUser())
    }
  }
  return new LoadUserStub()
}
