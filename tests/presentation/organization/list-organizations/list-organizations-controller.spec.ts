import { ListOrganizations } from '@/domain/usecases/organization/list-organizations/list-organizations'
import { ListOrganizationsController } from '@/presentation/controllers/organization/list-organizations/list-organizations-controller'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockListOrganizations, mockOrganization } from '@/tests/presentation/mocks/organization-mocks'

type SutTypes = {
  sut: ListOrganizationsController
  listOrganizationsStub: ListOrganizations
}

const makeSut = (): SutTypes => {
  const listOrganizationsStub = mockListOrganizations()
  const sut = new ListOrganizationsController(listOrganizationsStub)
  return {
    sut,
    listOrganizationsStub
  }
}

describe('ListOrganizationsController', () => {
  it('should call ListOrganizations', async () => {
    const { sut, listOrganizationsStub } = makeSut()
    const listSpy = jest.spyOn(listOrganizationsStub, 'list')
    await sut.handle({})
    expect(listSpy).toBeCalledTimes(1)
  })
  it('should return 500 if ListOrganizations throws', async () => {
    const { sut, listOrganizationsStub } = makeSut()
    jest.spyOn(listOrganizationsStub, 'list').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  it('should return 200 if ListOrganizations succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok([mockOrganization()]))
  })
})
