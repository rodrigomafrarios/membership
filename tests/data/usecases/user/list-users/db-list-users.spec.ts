import { ListUsersRepository } from '@/data/interfaces/db/user/list-users-repository'
import { DbListUsers } from '@/data/usecases/user/list-users/db-list-users'
import { mockListUsersRepository, mockUser } from '@/tests/data/mocks/user-mocks'

type SutTypes = {
  sut: DbListUsers
  listUsersRepositoryStub: ListUsersRepository
}

const makeSut = (): SutTypes => {
  const listUsersRepositoryStub = mockListUsersRepository()
  const sut = new DbListUsers(listUsersRepositoryStub)
  return {
    sut,
    listUsersRepositoryStub
  }
}

describe('DbListUsers', () => {
  it('should call ListUsersRepository', async () => {
    const { sut, listUsersRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listUsersRepositoryStub, 'list')
    await sut.list()
    expect(listSpy).toHaveBeenCalledTimes(1)
  })
  it('should throw if ListUsersRepository throws', async () => {
    const { sut, listUsersRepositoryStub } = makeSut()
    jest.spyOn(listUsersRepositoryStub, 'list').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.list()
    await expect(promise).rejects.toThrow()
  })
  it('should return empty array if no user found', async () => {
    const { sut, listUsersRepositoryStub } = makeSut()
    jest.spyOn(listUsersRepositoryStub, 'list').mockResolvedValueOnce([])
    const response = await sut.list()
    expect(response).toEqual([])
  })
  it('should return users list', async () => {
    const { sut } = makeSut()
    const response = await sut.list()
    expect(response).toEqual([mockUser()])
  })
})
