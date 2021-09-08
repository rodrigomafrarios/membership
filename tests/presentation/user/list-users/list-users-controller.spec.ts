import { ListUsers } from '@/domain/usecases/user/list-users/list-users'
import { ListUsersController } from '@/presentation/controllers/user/list-users/list-users-controller'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockListUsersStub, mockUser } from '@/tests/presentation/mocks/user-mocks'

type SutTypes = {
  sut: ListUsersController
  listUsersStub: ListUsers
}

const makeSut = (): SutTypes => {
  const listUsersStub = mockListUsersStub()
  const sut = new ListUsersController(listUsersStub)
  return {
    sut,
    listUsersStub
  }
}

describe('ListUsersController', () => {
  it('should call ListUsers', async () => {
    const { sut, listUsersStub } = makeSut()
    const listSpy = jest.spyOn(listUsersStub, 'list')
    await sut.handle({})
    expect(listSpy).toHaveBeenCalledTimes(1)
  })
  it('should return 500 if ListUsers throw', async () => {
    const { sut, listUsersStub } = makeSut()
    jest.spyOn(listUsersStub, 'list').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  it('should return 200 if ListUsers succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok([mockUser()]))
  })
})
