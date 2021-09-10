import { PolicyGenerator, PolicyGeneratorParams, PolicyGeneratorResponse } from '../../interfaces/aws/policy-generator'
import { Decrypter } from '../../interfaces/criptography/decrypter'
import { Authorizer, AuthorizerParams } from '../../../domain/usecases/auth/authorizer'
import { UserModel } from '../../../domain/models/user'

export class AWSAuthorizer implements Authorizer {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly policyGenerator: PolicyGenerator,
    private readonly allowedRoles: Array<UserModel['role']>
  ) {}

  async auth (params: AuthorizerParams): Promise<PolicyGeneratorResponse> {
    const { accessToken, methodArn } = params
    const decryptedUser = await this.decrypter.decrypt(accessToken)
    const policyGeneratorParams: PolicyGeneratorParams = {
      principalId: 'user',
      effect: 'Deny',
      resource: methodArn,
      decryptedUser: ''
    }

    if (decryptedUser?.data) {
      const { userId, userRole } = JSON.parse(decryptedUser.data)
      if (userId && userRole) {
        let isAllowed = false
        for (const role of this.allowedRoles) {
          if (userRole === role) {
            isAllowed = true
            break
          }
        }
        if (isAllowed) {
          policyGeneratorParams.effect = 'Allow'
          policyGeneratorParams.decryptedUser = userId
        }
      }
    }

    const policy = await this.policyGenerator.generate(policyGeneratorParams)

    return policy
  }
}
