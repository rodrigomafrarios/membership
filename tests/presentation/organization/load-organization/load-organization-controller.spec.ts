import { LoadOrganization } from '@/domain/usecases/organization/load-organization/load-organization'
import { LoadOrganizationController } from '@/presentation/controllers/organization/load-organization/load-organization-controller'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockLoadOrganization, mockOrganization } from '@/tests/presentation/mocks/organization-mocks'

type SutTypes = {
  sut: LoadOrganizationController
  loadOrganizationStub: LoadOrganization
}

const makeSut = (): SutTypes => {
  const loadOrganizationStub = mockLoadOrganization()
  const sut = new LoadOrganizationController(loadOrganizationStub)
  return {
    sut,
    loadOrganizationStub
  }
}

describe('LoadOrganizationController', () => {
  it('should call LoadOrganization', async () => {
    const { sut, loadOrganizationStub } = makeSut()
    const spyLoad = jest.spyOn(loadOrganizationStub, 'load')
    await sut.handle({
      body: {
        organizationId: 'any-org-id'
      }
    })
    expect(spyLoad).toHaveBeenCalledWith('any-org-id')
  })
  it('should return 500 if LoadOrganization fails', async () => {
    const { sut, loadOrganizationStub } = makeSut()
    jest.spyOn(loadOrganizationStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({
      body: {
        organizationId: 'any-org-id'
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  it('should return 200 if LoadOrganization succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        organizationId: 'any-org-id'
      }
    })
    expect(httpResponse).toEqual(ok(mockOrganization()))
  })
})
