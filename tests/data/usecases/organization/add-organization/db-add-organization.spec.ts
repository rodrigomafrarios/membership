import { mockAddOrganizationParams } from '@/tests/presentation/mocks/organization-mocks'
import { AddOrganizationRepository } from '@/data/interfaces/db/organization/add-organization-repository'
import { DbAddOrganization } from '@/data/usecases/organization/add-organization/db-add-organization'
import { mockAddOrganizationRepository, mockLoadOrganizationRepository } from '@/tests/data/mocks/organization-mocks'
import { LoadOrganizationRepository } from '@/data/interfaces/db/organization/load-organization-repository'

type SutTypes = {
  sut: DbAddOrganization
  loadOrganizationByIdRepositoryStub: LoadOrganizationRepository
  addOrganizationRepositoryStub: AddOrganizationRepository
}

const makeSut = (): SutTypes => {
  const loadOrganizationByIdRepositoryStub = mockLoadOrganizationRepository()
  const addOrganizationRepositoryStub = mockAddOrganizationRepository()
  const sut = new DbAddOrganization(loadOrganizationByIdRepositoryStub, addOrganizationRepositoryStub)
  return {
    sut,
    loadOrganizationByIdRepositoryStub,
    addOrganizationRepositoryStub
  }
}

describe('DbAddOrganization', () => {
  it('should call LoadOrganizationRepository with correct value', async () => {
    const { sut, loadOrganizationByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadOrganizationByIdRepositoryStub, 'loadByOrganizationId')
    const params = mockAddOrganizationParams()
    await sut.add(params)
    expect(loadSpy).toHaveBeenCalledWith(params.organizationId)
  })
  it('should call AddOrganizationRepository with correct value', async () => {
    const { sut, loadOrganizationByIdRepositoryStub, addOrganizationRepositoryStub } = makeSut()
    jest.spyOn(loadOrganizationByIdRepositoryStub, 'loadByOrganizationId').mockResolvedValueOnce(undefined)
    const addSpy = jest.spyOn(addOrganizationRepositoryStub, 'add')
    await sut.add(mockAddOrganizationParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddOrganizationParams())
  })
  it('should return true if organization was created', async () => {
    const { sut, loadOrganizationByIdRepositoryStub } = makeSut()
    jest.spyOn(loadOrganizationByIdRepositoryStub, 'loadByOrganizationId').mockResolvedValueOnce(undefined)
    const response = await sut.add(mockAddOrganizationParams())
    expect(response).toBeTruthy()
  })
  it('should return false if organization wasnt created', async () => {
    const { sut, loadOrganizationByIdRepositoryStub, addOrganizationRepositoryStub } = makeSut()
    jest.spyOn(loadOrganizationByIdRepositoryStub, 'loadByOrganizationId').mockResolvedValueOnce(undefined)
    jest.spyOn(addOrganizationRepositoryStub, 'add').mockResolvedValueOnce(false)
    const response = await sut.add(mockAddOrganizationParams())
    expect(response).toBeFalsy()
  })
  it('should throw if AddOrganizationRepository throws', async () => {
    const { sut, loadOrganizationByIdRepositoryStub, addOrganizationRepositoryStub } = makeSut()
    jest.spyOn(loadOrganizationByIdRepositoryStub, 'loadByOrganizationId').mockResolvedValueOnce(undefined)
    jest.spyOn(addOrganizationRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddOrganizationParams())
    await expect(promise).rejects.toThrow()
  })
})
