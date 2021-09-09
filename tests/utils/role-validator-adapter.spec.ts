import { RoleValidatorAdapter } from '@/utils/role-validator-adapter'

const makeSut = () => {
  return new RoleValidatorAdapter()
}

describe('RoleValidatorAdapter', () => {
  it('should return true if role is valid', () => {
    const sut = makeSut()
    const response = sut.isValid('SYSADMIN')
    expect(response).toBeTruthy()
  })
  it('should return false if role is not valid', () => {
    const sut = makeSut()
    const response = sut.isValid('123')
    expect(response).toBeFalsy()
  })
})
