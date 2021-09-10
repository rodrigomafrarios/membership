import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography/jwt/jwt-adapter'
import { mockToEncrypt } from '@/tests/infra/mocks/encrypter-mock'

jest.mock('jsonwebtoken', () => ({
	async sign (): Promise<string> {
		return Promise.resolve('any_token')
	},
	async verify (token: string): Promise<string> {
		return Promise.resolve('any_value')
	}
}))

const makeSut = (): JwtAdapter => {
	return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
  describe('sign()', () => {
		test('Should call sign with correct values', async () => {
			const sut = makeSut()
			const signSpy = jest.spyOn(jwt, 'sign')
			await sut.encrypt(mockToEncrypt())
			expect(signSpy).toHaveBeenCalledWith({ data: mockToEncrypt() }, 'secret')
		})
		test('Should return a token on sign success', async () => {
			const sut = makeSut()
			const accessToken = await sut.encrypt(mockToEncrypt())
			expect(accessToken).toBe('any_token')
		})
		test('Should throw if sign throws', async () => {
			const sut = makeSut()
			jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
			const promise = sut.encrypt(mockToEncrypt())
			await expect(promise).rejects.toThrow()
		})
	})
	describe('verify()', () => {
		test('Should call verify with correct values', async () => {
			const sut = makeSut()
			const verifySpy = jest.spyOn(jwt, 'verify')
			await sut.decrypt('any_token')
			expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
		})
		test('Should return a value on verify success', async () => {
			const sut = makeSut()
			const value = await sut.decrypt('any_token')
			expect(value).toBe('any_value')
		})
		test('Should throw if verify throws', async () => {
			const sut = makeSut()
			jest.spyOn(jwt, 'verify').mockRejectedValueOnce(new Error())
			const promise = sut.decrypt('any_token')
			await expect(promise).rejects.toThrow()
		})
	})
})
