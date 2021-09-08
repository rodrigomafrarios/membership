import { AddOrganizationController } from '@/presentation/controllers/organization/add-organization/add-organization-controller'
import { Validation } from '@/presentation/interfaces/validation'
import { makeValidation } from '@/tests/presentation/mocks/validation-mocks'
import { mockAddOrganization, mockAddOrganizationParams } from '@/tests/presentation/mocks/organization-mocks'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'
import { AddOrganization } from '@/domain/usecases/organization/add-organization/add-organization'

type SutTypes = {
  sut: AddOrganizationController
  validatorStub: Validation
  addOrganizationStub: AddOrganization
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidation()
  const addOrganizationStub = mockAddOrganization()
  const sut = new AddOrganizationController(validatorStub, addOrganizationStub)
  return {
    sut,
    validatorStub,
    addOrganizationStub
  }
}

describe('AddOrganizationController', () => {
  it('should call validator with correct value', async () => {
    const { sut, validatorStub } = makeSut()
    const validatorSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle({
      body: {
        organizationName: mockAddOrganizationParams()
      }
    })
    expect(validatorSpy).toHaveBeenCalledWith({
      organizationName: mockAddOrganizationParams()
    })
  })
  it('should return 400 if validation fails', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle({
      body: {
        organizationName: mockAddOrganizationParams()
      }
    })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  it('should call addOrganization with correct value', async () => {
    const { sut, addOrganizationStub } = makeSut()
    const addSpy = jest.spyOn(addOrganizationStub, 'add')
    await sut.handle({
      body: {
        organizationName: mockAddOrganizationParams()
      }
    })
    expect(addSpy).toHaveBeenCalledWith({
      organizationName: mockAddOrganizationParams()
    })
  })
  it('should return 400 if addOrganization fails', async () => {
    const { sut, addOrganizationStub } = makeSut()
    jest.spyOn(addOrganizationStub, 'add').mockResolvedValueOnce(false)
    const httpResponse = await sut.handle({
      body: {
        organizationName: mockAddOrganizationParams()
      }
    })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  it('should return 500 if addOrganization throws', async () => {
    const { sut, addOrganizationStub } = makeSut()
    jest.spyOn(addOrganizationStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({
      body: {
        organizationName: mockAddOrganizationParams()
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  it('should return 201 if addOrganization succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        organizationName: mockAddOrganizationParams()
      }
    })
    expect(httpResponse).toEqual(created())
  })
})
