import { mockOrganization } from '@/tests/presentation/mocks/organization-mocks'
import { LoadOrganizationRepository } from '@/data/interfaces/db/organization/load-organization-repository'
import { DbLoadOrganization } from '@/data/usecases/organization/load-organization/db-load-organization'
import { mockLoadOrganizationRepository } from '@/tests/data/mocks/organization-mocks'

type SutTypes = {
  sut: DbLoadOrganization
  loadOrganizationRepositoryStub: LoadOrganizationRepository
}

const makeSut = (): SutTypes => {
  const loadOrganizationRepositoryStub = mockLoadOrganizationRepository()
  const sut = new DbLoadOrganization(loadOrganizationRepositoryStub)
  return {
    sut,
    loadOrganizationRepositoryStub
  }
}

describe('DbLoadOrganization', () => {
  it('should call LoadOrganizationRepository with correct value', async () => {
    const { sut, loadOrganizationRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadOrganizationRepositoryStub, 'loadByOrganizationId')
    await sut.load('any-id')
    expect(loadSpy).toHaveBeenCalledWith('any-id')
  })
  it('should throw if LoadOrganizationRepository throws', async () => {
    const { sut, loadOrganizationRepositoryStub } = makeSut()
    jest.spyOn(loadOrganizationRepositoryStub, 'loadByOrganizationId').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.load('any-id')
    await expect(promise).rejects.toThrow()
  })
  it('should load organization by id', async () => {
    const { sut } = makeSut()
    const organization = await sut.load('any-id')
    expect(organization).toEqual(mockOrganization())
  })
})
