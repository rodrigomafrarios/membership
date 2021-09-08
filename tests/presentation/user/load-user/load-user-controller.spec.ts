import { LoadUser } from '@/domain/usecases/user/load-user/load-user'
import { LoadUserController } from '@/presentation/controllers/user/load-user/load-user-controller'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockLoadUserStub, mockUser } from '@/tests/presentation/mocks/user-mocks'

type SutTypes = {
  sut: LoadUserController
  loadUserStub: LoadUser
}

const makeSut = (): SutTypes => {
  const loadUserStub = mockLoadUserStub()
  const sut = new LoadUserController(loadUserStub)
  return {
    sut,
    loadUserStub
  }
}

describe('LoadUserController', () => {
  it('should call LoadUser with correct values', async () => {
    const { sut, loadUserStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserStub, 'loadById')
    await sut.handle({
      body: {
        id: 'any-id'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any-id')
  })
  it('should return 500 if LoadUser throws', async () => {
    const { sut, loadUserStub } = makeSut()
    jest.spyOn(loadUserStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({
      body: {
        id: 'any-id'
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  it('should return 200 if LoadUser succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        id: 'any-id'
      }
    })
    expect(httpResponse).toEqual(ok(mockUser()))
  })
})
