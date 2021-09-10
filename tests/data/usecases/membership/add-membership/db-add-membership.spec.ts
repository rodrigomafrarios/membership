import { AddMembershipRepository } from '@/data/interfaces/db/membership/add-membership/add-membership-repository'
import { LoadMembershipRepository } from '@/data/interfaces/db/membership/load-membership/load-membership-repository'
import { LoadOrganizationRepository } from '@/data/interfaces/db/organization/load-organization-repository'
import { LoadUserByIdRepository } from '@/data/interfaces/db/user/load-user-by-id-repository'
import { DbAddMembership } from '@/data/usecases/membership/add-membership/db-add-membership'
import { mockAddMembershipParams, mockAddMembershipRepository, mockAddMembershipRepositoryParams, mockLoadMembershipByUserOrganizationRepository } from '@/tests/data/mocks/membership-mocks'
import { mockLoadOrganizationRepository } from '@/tests/data/mocks/organization-mocks'
import { mockLoadUserByIdRepository } from '@/tests/data/mocks/user-mocks'

type SutTypes = {
  sut: DbAddMembership
  loadUserByIdRepositoryStub: LoadUserByIdRepository
  loadOrganizationByIdRepositoryStub: LoadOrganizationRepository
  loadMembershipByUserOrganizationRepositoryStub: LoadMembershipRepository
  addMembershipRepositoryStub: AddMembershipRepository
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = mockLoadUserByIdRepository()
  const loadOrganizationByIdRepositoryStub = mockLoadOrganizationRepository()
  const loadMembershipByUserOrganizationRepositoryStub = mockLoadMembershipByUserOrganizationRepository()
  const addMembershipRepositoryStub = mockAddMembershipRepository()
  const sut = new DbAddMembership(loadUserByIdRepositoryStub, loadOrganizationByIdRepositoryStub, loadMembershipByUserOrganizationRepositoryStub, addMembershipRepositoryStub)
  return {
    sut,
    loadUserByIdRepositoryStub,
    loadOrganizationByIdRepositoryStub,
    loadMembershipByUserOrganizationRepositoryStub,
    addMembershipRepositoryStub
  }
}

describe('DbAddMembership', () => {
  it('should call LoadUserByIdRepository with correct value', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.add(mockAddMembershipParams())
    const { userId } = mockAddMembershipParams()
    expect(loadSpy).toHaveBeenCalledWith(userId)
  })
  it('should throw if LoadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddMembershipParams())
    await expect(promise).rejects.toThrow()
  })
  it('should return false if no user found', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockResolvedValueOnce(undefined)
    const response = await sut.add(mockAddMembershipParams())
    expect(response).toBeFalsy()
  })
  it('should call LoadOrganizationRepository with correct value', async () => {
    const { sut, loadOrganizationByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadOrganizationByIdRepositoryStub, 'loadByOrganizationId')
    await sut.add(mockAddMembershipParams())
    const { organizationId } = mockAddMembershipParams()
    expect(loadSpy).toHaveBeenCalledWith(organizationId)
  })
  it('should throw if LoadOrganizationRepository throws', async () => {
    const { sut, loadOrganizationByIdRepositoryStub } = makeSut()
    jest.spyOn(loadOrganizationByIdRepositoryStub, 'loadByOrganizationId').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddMembershipParams())
    await expect(promise).rejects.toThrow()
  })
  it('should return false if no organization found', async () => {
    const { sut, loadOrganizationByIdRepositoryStub } = makeSut()
    jest.spyOn(loadOrganizationByIdRepositoryStub, 'loadByOrganizationId').mockResolvedValueOnce(undefined)
    const response = await sut.add(mockAddMembershipParams())
    expect(response).toBeFalsy()
  })
  it('should call LoadMembershipRepository with correct value', async () => {
    const { sut, loadMembershipByUserOrganizationRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadMembershipByUserOrganizationRepositoryStub, 'loadByUserOrganization')
    await sut.add(mockAddMembershipParams())
    expect(loadSpy).toHaveBeenCalledWith(mockAddMembershipParams())
  })
  it('should throw if LoadMembershipRepository throws', async () => {
    const { sut, loadMembershipByUserOrganizationRepositoryStub } = makeSut()
    jest.spyOn(loadMembershipByUserOrganizationRepositoryStub, 'loadByUserOrganization').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddMembershipParams())
    await expect(promise).rejects.toThrow()
  })
  it('should call AddMembershipRepository with correct values', async () => {
    const { sut, addMembershipRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addMembershipRepositoryStub, 'add')
    await sut.add(mockAddMembershipParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddMembershipRepositoryParams())
  })
  it('should throw if AddMembershipRepository throws', async () => {
    const { sut, addMembershipRepositoryStub } = makeSut()
    jest.spyOn(addMembershipRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddMembershipParams())
    await expect(promise).rejects.toThrow()
  })
  it('should return false if membership not saved', async () => {
    const { sut, addMembershipRepositoryStub } = makeSut()
    jest.spyOn(addMembershipRepositoryStub, 'add').mockResolvedValueOnce(false)
    const response = await sut.add(mockAddMembershipParams())
    expect(response).toBeFalsy()
  })
  it('should return true if membership saved', async () => {
    const { sut } = makeSut()
    const response = await sut.add(mockAddMembershipParams())
    expect(response).toBeTruthy()
  })
})
