import { LoginParams } from '@/domain/usecases/login/login'
import { DbLogin } from '@/data/usecases/login/db-login'
import { LoadUserByEmailRepository } from '@/data/interfaces/db/user/load-user-by-email-repository'
import { HashComparer } from '@/data/interfaces/criptography/hash-comparer'
import { Encrypter } from '@/data/interfaces/criptography/encrypter'
import { UpdateAccessTokenRepository } from '@/data/interfaces/db/user/update-access-token-repository'
import { mockUser, mockLoadUserByEmailRepository } from '@/tests/data/mocks/user-mocks'

type SutTypes = {
  sut: DbLogin
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
	class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
		async updateAccessToken (): Promise<void> {
			return Promise.resolve()
		}
	}
	return new UpdateAccessTokenRepositoryStub()
}

export const mockHashComparer = (): HashComparer => {
	class HashComparerStub implements HashComparer {
		async compare (): Promise<boolean> {
			return Promise.resolve(true)
		}
	}
	return new HashComparerStub()
}

export const mockEncrypter = (): Encrypter => {
	class EncrypterStub implements Encrypter {
		async encrypt (): Promise<string> {
			return Promise.resolve('any_token')
		}
	}
	return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbLogin(loadUserByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub)
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

const mockLoginParams = (): LoginParams => ({
  email: 'any_email@gmail.com',
  password: 'any_password'
})

describe('Login Usecase', () => {
  test('Should call LoadUserByEmailRepository with correct values', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadUserByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.getToken(mockLoginParams())
    const { email } = mockLoginParams()
    expect(loadUserByEmailSpy).toHaveBeenCalledWith(email)
  })

  test('Should throw if LoadUserByEmailRepository throws', async () => {
		const { sut, loadUserByEmailRepositoryStub } = makeSut()
		jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockRejectedValueOnce(new Error())
		const promise = sut.getToken(mockLoginParams())
		await expect(promise).rejects.toThrow()
	})

  test('Should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(null)
    const User = await sut.getToken(mockLoginParams())
    expect(User).toBeNull()
  })

  test('Should call HashComparer with correct value', async () => {
    const { sut, hashComparerStub } = makeSut()
    const hashComparerSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.getToken(mockLoginParams())
    const { password } = mockLoginParams()
    expect(hashComparerSpy).toHaveBeenCalledWith(password, 'hashed_password')
  })

  test('Should throw if HashComparer throws', async () => {
		const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error())
		const promise = sut.getToken(mockLoginParams())
		await expect(promise).rejects.toThrow()
	})

  test('Should return false on hash comparer', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(null)
		const response = await sut.getToken(mockLoginParams())
		expect(response).toBeNull()
  })

  test('Should call encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.getToken(mockLoginParams())
    const { id, role } = mockUser()
    expect(encrypterSpy).toHaveBeenCalledWith(JSON.stringify({ userId: id, userRole: role }))
  })

  test('Should throw if Encrypter throws', async () => {
		const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error())
		const promise = sut.getToken(mockLoginParams())
		await expect(promise).rejects.toThrow()
	})

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateAccessTokenSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.getToken(mockLoginParams())
    const { email } = mockUser()
    expect(updateAccessTokenSpy).toHaveBeenCalledWith(email, 'any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
		const { sut, updateAccessTokenRepositoryStub } = makeSut()
		jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockRejectedValueOnce(new Error())
		const promise = sut.getToken(mockLoginParams())
		await expect(promise).rejects.toThrow()
	})

  test('Should return accessToken', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.getToken(mockLoginParams())
    expect(accessToken).toEqual('any_token')
  })
})
