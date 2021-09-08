import { ListOrganizationsRepository } from '@/data/interfaces/db/organization/list-organizations-repository'
import { DbListOrganizations } from '@/data/usecases/organization/list-organizations/db-list-organizations'
import { mockListOrganizationsRepository } from '@/tests/data/mocks/organization-mocks'

type SutTypes = {
  sut: DbListOrganizations
  listOrganizationsRepositoryStub: ListOrganizationsRepository
}

const makeSut = (): SutTypes => {
  const listOrganizationsRepositoryStub = mockListOrganizationsRepository()
  const sut = new DbListOrganizations(listOrganizationsRepositoryStub)
  return {
    sut,
    listOrganizationsRepositoryStub
  }
}

describe('DbListOrganizations', () => {
  it('should call ListOrganizationsRepository', async () => {
    const { sut, listOrganizationsRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listOrganizationsRepositoryStub, 'list')
    await sut.list()
    expect(listSpy).toHaveBeenCalledTimes(1)
  })
  it('should throw if ListOrganizationsRepository throws', async () => {
    const { sut, listOrganizationsRepositoryStub } = makeSut()
    jest.spyOn(listOrganizationsRepositoryStub, 'list').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.list()
    await expect(promise).rejects.toThrow()
  })
})
