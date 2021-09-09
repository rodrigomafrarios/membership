import { AddMembershipController } from '@/presentation/controllers/membership/add-membership/add-membership-controller'
import { Validation } from '@/presentation/interfaces/validation'
import { makeValidation } from '@/tests/presentation/mocks/validation-mocks'
import { mockAddMembership, mockAddMembershipRequest } from '@/tests/presentation/mocks/membership-mocks'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'
import { AddMembership } from '@/domain/usecases/membership/add-membership/add-membership'

type SutTypes = {
  sut: AddMembershipController
  validatorStub: Validation
  addMembershipStub: AddMembership
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidation()
  const addMembershipStub = mockAddMembership()
  const sut = new AddMembershipController(validatorStub, addMembershipStub)
  return {
    sut,
    validatorStub,
    addMembershipStub
  }
}

describe('AddMembershipController', () => {
  it('should call validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validatorSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(mockAddMembershipRequest())
    const { body } = mockAddMembershipRequest()
    expect(validatorSpy).toHaveBeenCalledWith(body)
  })
  it('should return 400 if validator return an error', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockAddMembershipRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  it('should call addMembership with correct values', async () => {
    const { sut, addMembershipStub } = makeSut()
    const addSpy = jest.spyOn(addMembershipStub, 'add')
    await sut.handle(mockAddMembershipRequest())
    const { body } = mockAddMembershipRequest()
    expect(addSpy).toHaveBeenCalledWith(body)
  })
  it('should return 400 if addMembership fails', async () => {
    const { sut, addMembershipStub } = makeSut()
    jest.spyOn(addMembershipStub, 'add').mockResolvedValueOnce(false)
    const httpResponse = await sut.handle(mockAddMembershipRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  it('should return 500 if addMembership throws', async () => {
    const { sut, addMembershipStub } = makeSut()
    jest.spyOn(addMembershipStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockAddMembershipRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  it('should return 201 when succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockAddMembershipRequest())
    expect(httpResponse).toEqual(created())
  })
})
