import { LoadUserByIdRepository } from '@/data/interfaces/db/user/load-user-by-id-repository'
import { DbLoadUser } from '@/data/usecases/user/load-user/db-load-user'
import { mockLoadUserByIdRepository, mockUser } from '@/tests/data/mocks/user-mocks'

type SutTypes = {
  sut: DbLoadUser
  loadUserByIdRepositoryStub: LoadUserByIdRepository
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = mockLoadUserByIdRepository()
  const sut = new DbLoadUser(loadUserByIdRepositoryStub)
  return {
    sut,
    loadUserByIdRepositoryStub
  }
}

describe('DbLoadUser', () => {
  it('should call LoadUserByIdRepository with correct value', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.loadById('any-id')
    expect(loadSpy).toHaveBeenCalledWith('any-id')
  })
  it('should throw if LoadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.loadById('any-id')
    await expect(promise).rejects.toThrow()
  })
  it('should load user by id', async () => {
    const { sut } = makeSut()
    const user = await sut.loadById('any-id')
    expect(user).toEqual(mockUser())
  })
})
