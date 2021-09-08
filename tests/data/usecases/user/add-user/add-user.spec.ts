import { AddUser } from '@/domain/usecases/user/add-user/add-user'
import { DbAddUser } from '@/data/usecases/user/add-user/db-add-user'
import { AddUserRepository } from '@/data/interfaces/db/user/add-user-repository'
import { mockUser, mockAddUserParams, mockAddUserRepository, mockLoadUserByEmailRepository } from '@/tests/data/mocks/user-mocks'
import { LoadUserByEmailRepository } from '@/data/interfaces/db/user/load-user-by-email-repository'
import { Hasher } from '@/data/interfaces/criptography/hasher'

type SutTypes = {
  sut: AddUser
  addUserRepositoryStub: AddUserRepository
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hasherStub: Hasher
}

export const mockHasher = (): Hasher => {
	class HasherStub {
		async hash (): Promise<string> {
			return Promise.resolve('any_password')
		}
	}
	return new HasherStub()
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = mockAddUserRepository()
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const hasherStub = mockHasher()
  const sut = new DbAddUser(addUserRepositoryStub, loadUserByEmailRepositoryStub, hasherStub)
  return {
    sut,
    addUserRepositoryStub,
    loadUserByEmailRepositoryStub,
    hasherStub
  }
}

describe('AddUser Usecase', () => {
  test('Should call LoadUserByEmailRepository with correct values', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadByEmailRepositorySpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddUserParams())
    expect(loadByEmailRepositorySpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return null if LoadUserByEmailRepository not return null', async () => {
		const { sut } = makeSut()
		const User = await sut.add(mockUser())
		expect(User).toBeNull()
	})

  test('Should call Hasher with correct password', async () => {
		const { sut, hasherStub, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    .mockReturnValueOnce(Promise.resolve(null))
		const hashSpy = jest.spyOn(hasherStub, 'hash')
		await sut.add(mockAddUserParams())
		expect(hashSpy).toHaveBeenCalledWith('any_password')
	})

  test('Should throw if Hasher throws', async () => {
		const { sut, loadUserByEmailRepositoryStub, hasherStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    .mockReturnValueOnce(Promise.resolve(null))
		jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
		const promise = sut.add(mockAddUserParams())
		await expect(promise).rejects.toThrow()
	})

  test('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositoryStub, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    .mockReturnValueOnce(Promise.resolve(null))
    const addUserRepositorySpy = jest.spyOn(addUserRepositoryStub, 'add')
    await sut.add(mockAddUserParams())
    expect(addUserRepositorySpy).toHaveBeenCalledWith(mockAddUserParams())
  })

  test('Should throw if AddUserRepository throws', async () => {
		const { sut, addUserRepositoryStub, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    .mockReturnValueOnce(Promise.resolve(null))
		jest.spyOn(addUserRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
		const promise = sut.add(mockAddUserParams())
		await expect(promise).rejects.toThrow()
	})
})
