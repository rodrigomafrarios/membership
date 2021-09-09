import { ListMemberships } from '@/domain/usecases/membership/list-memberships/list-memberships'
import { ListMembershipsController } from '@/presentation/controllers/membership/list-memberships/list-memberships-controller'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockListMembership, mockListMemberships, mockListMembershipsRequest } from '@/tests/presentation/mocks/membership-mocks'

type SutTypes = {
  sut: ListMembershipsController
  listMembershipsStub: ListMemberships
}

const makeSut = (): SutTypes => {
  const listMembershipsStub = mockListMemberships()
  const sut = new ListMembershipsController(listMembershipsStub)
  return {
    sut,
    listMembershipsStub
  }
}

describe('ListMembershipsController', () => {
  it('should call ListMemberships', async () => {
    const { sut, listMembershipsStub } = makeSut()
    const listSpy = jest.spyOn(listMembershipsStub, 'listByOrganizationId')
    await sut.handle(mockListMembershipsRequest())
    expect(listSpy).toHaveBeenCalledTimes(1)
  })
  it('should return 500 if ListMemberships throws', async () => {
    const { sut, listMembershipsStub } = makeSut()
    jest.spyOn(listMembershipsStub, 'listByOrganizationId').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockListMembershipsRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  it('should return 200 if ListMemberships succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockListMembershipsRequest())
    expect(httpResponse).toEqual(ok([mockListMembership()]))
  })
})
