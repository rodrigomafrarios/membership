import { mockAddOrganizationParams } from '@/tests/presentation/mocks/organization-mocks'
import { AddOrganizationRepository } from '@/data/interfaces/db/organization/add-organization-repository'
import { DbAddOrganization } from '@/data/usecases/organization/add-organization/db-add-organization'
import { mockAddOrganizationRepository } from '@/tests/data/mocks/organization-mocks'

type SutTypes = {
  sut: DbAddOrganization
  addOrganizationRepositoryStub: AddOrganizationRepository
}

const makeSut = (): SutTypes => {
  const addOrganizationRepositoryStub = mockAddOrganizationRepository()
  const sut = new DbAddOrganization(addOrganizationRepositoryStub)
  return {
    sut,
    addOrganizationRepositoryStub
  }
}

describe('DbAddOrganization', () => {
  it('should call AddOrganizationRepository with correct value', async () => {
    const { sut, addOrganizationRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addOrganizationRepositoryStub, 'add')
    await sut.add(mockAddOrganizationParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddOrganizationParams())
  })
  it('should return true if organization was created', async () => {
    const { sut } = makeSut()
    const response = await sut.add(mockAddOrganizationParams())
    expect(response).toBeTruthy()
  })
  it('should return false if organization wasnt created', async () => {
    const { sut, addOrganizationRepositoryStub } = makeSut()
    jest.spyOn(addOrganizationRepositoryStub, 'add').mockResolvedValueOnce(false)
    const response = await sut.add(mockAddOrganizationParams())
    expect(response).toBeFalsy()
  })
  it('should throw if AddOrganizationRepository throws', async () => {
    const { sut, addOrganizationRepositoryStub } = makeSut()
    jest.spyOn(addOrganizationRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddOrganizationParams())
    await expect(promise).rejects.toThrow()
  })
})
