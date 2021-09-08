import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

const makeSut = () => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  it('should return true if e-mail is valid', () => {
    const sut = makeSut()
    const response = sut.isValid('rodrigomafrarios@gmail.com')
    expect(response).toBeTruthy()
  })
  it('should return false if e-mail is not valid', () => {
    const sut = makeSut()
    const response = sut.isValid('123')
    expect(response).toBeFalsy()
  })
})
