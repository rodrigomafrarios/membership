import { Login, LoginParams } from '../../../domain/usecases/login/login'
import { LoadUserByEmailRepository } from '../../interfaces/db/user/load-user-by-email-repository'
import { HashComparer } from '../../interfaces/criptography/hash-comparer'
import { Encrypter } from '../../interfaces/criptography/encrypter'
import { UpdateAccessTokenRepository } from '../../interfaces/db/user/update-access-token-repository'

export class DbLogin implements Login {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
    ) {}

  async getToken (params: LoginParams): Promise<string> {
    const user = await this.loadUserByEmailRepository.loadByEmail(params.email)
    if (user) {
      const isValid = await this.hashComparer.compare(params.password, user.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(JSON.stringify({ userId: user.id, userRole: user.role }))
        await this.updateAccessTokenRepository.updateAccessToken(user.email, accessToken)
        return accessToken
      }
    }
    return null
  }
}
