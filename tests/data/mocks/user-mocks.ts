import { LoadUserByEmailRepository } from '@/data/interfaces/db/user/load-user-by-email-repository'
import { UserModel, UserRole } from '@/domain/models/user'
import { AddUserRepository } from '@/data/interfaces/db/user/add-user-repository'
import { AddUserParams } from '@/domain/usecases/user/add-user/add-user'
import { v4 as uuidv4 } from 'uuid'
import { ListUsersRepository } from '@/data/interfaces/db/user/list-users-repository'
import { LoadUserByIdRepository } from '@/data/interfaces/db/user/load-user-by-id-repository'

const id = uuidv4()

export const mockAddUserParams = (): AddUserParams => ({
  email: 'any_email@mail.com',
  password: 'any_password',
  name: 'any_name',
  role: UserRole.sysadmin
})

export const mockUser = (): UserModel => ({
  id,
  name: 'any_name',
  email: 'any_email',
  password: 'hashed_password',
  role: UserRole.sysadmin
})

export const mockLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (): Promise<UserModel> {
      return Promise.resolve(mockUser())
    }
  }
  return new LoadUserByEmailRepositoryStub()
}

export const mockLoadUserByIdRepository = (): LoadUserByIdRepository => {
  class LoadUserByIdRepositoryStub implements LoadUserByIdRepository {
    async loadById (): Promise<UserModel> {
      return Promise.resolve(mockUser())
    }
  }
  return new LoadUserByIdRepositoryStub()
}

export const mockListUsersRepository = (): ListUsersRepository => {
  class ListUsersRepositoryStub implements ListUsersRepository {
    async list (): Promise<UserModel[]> {
      return Promise.resolve([mockUser()])
    }
  }
  return new ListUsersRepositoryStub()
}

export const mockAddUserRepository = (): AddUserRepository => {
	class AddUserRepositoryStub implements AddUserRepository {
		async add (): Promise<UserModel> {
			return Promise.resolve(mockUser())
		}
	}
	return new AddUserRepositoryStub()
}
