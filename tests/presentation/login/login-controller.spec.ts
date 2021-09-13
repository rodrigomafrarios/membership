import { Login } from '@/domain/usecases/login/login'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { makeLogin } from '@/tests/presentation/mocks/login-mocks'
import { makeValidation } from '@/tests/presentation/mocks/validation-mocks'
import { Validation } from '@/presentation/interfaces/validation'

type SutTypes = {
  sut: LoginController
  loginStub: Login
  validationStub: Validation
}

const makeRequest = () => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const loginStub = makeLogin()
  const sut = new LoginController(loginStub, validationStub)
  return {
    sut,
    validationStub,
    loginStub
  }
}

describe('LoginController', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const { body } = makeRequest()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeRequest())
    expect(validationSpy).toHaveBeenCalledWith(body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle({
      body: {
        email: 'wrong_mail',
        password: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 401 if login returns null', async () => {
    const { sut, loginStub } = makeSut()
    jest.spyOn(loginStub, 'getToken').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should call Login with correct values', async () => {
    const { sut, loginStub } = makeSut()
    const loginSpy = jest.spyOn(loginStub, 'getToken')
    await sut.handle(makeRequest())
    expect(loginSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should throw if Login throws', async () => {
    const { sut, loginStub } = makeSut()
    jest.spyOn(loginStub, 'getToken').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token'
    }))
  })
})
