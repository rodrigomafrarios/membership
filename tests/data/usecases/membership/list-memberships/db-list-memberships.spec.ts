import { ListMembershipsRepository } from '@/data/interfaces/db/membership/list-memberships/list-memberships-repository'
import { DbListMemberships } from '@/data/usecases/membership/list-memberships/db-list-memberships'
import { mockListMembershipsRepository, mockMembership } from '@/tests/data/mocks/membership-mocks'

type SutTypes = {
  sut: DbListMemberships
  listMembershipsRepositoryStub: ListMembershipsRepository
}

const makeSut = (): SutTypes => {
  const listMembershipsRepositoryStub = mockListMembershipsRepository()
  const sut = new DbListMemberships(listMembershipsRepositoryStub)
  return {
    sut,
    listMembershipsRepositoryStub
  }
}

describe('DbListMemberships', () => {
  it('should call ListMembershipsByOrganizationId with correct value', async () => {
    const { sut, listMembershipsRepositoryStub } = makeSut()
    const { organizationId } = mockMembership()
    const listSpy = jest.spyOn(listMembershipsRepositoryStub, 'listByOrganizationId')
    await sut.listByOrganizationId(organizationId)
    expect(listSpy).toHaveBeenCalledWith(organizationId)
  })
  it('should throw if ListMembershipsByOrganizationId throws', async () => {
    const { sut, listMembershipsRepositoryStub } = makeSut()
    const { organizationId } = mockMembership()
    jest.spyOn(listMembershipsRepositoryStub, 'listByOrganizationId').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.listByOrganizationId(organizationId)
    await expect(promise).rejects.toThrow()
  })
  it('should return list of memberships by organization id', async () => {
    const { sut } = makeSut()
    const { organizationId } = mockMembership()
    const response = await sut.listByOrganizationId(organizationId)
    expect(response).toEqual([mockMembership()])
  })
})
