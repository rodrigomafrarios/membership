import { PolicyGeneratorResponse } from '../../../data/interfaces/aws/policy-generator'
import { Authorizer } from '../../../domain/usecases/auth/authorizer'
import { badRequest, serverError } from '../../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../../interfaces/http'
import { Validation } from '../../interfaces/validation'

export class AuthController {
  constructor (
    private readonly validator: Validation,
    private readonly authorizer: Authorizer
  ) {}

  async handle (httpRequest: HttpRequest): Promise<PolicyGeneratorResponse | HttpResponse> {
    try {
      const { body } = httpRequest
      const error = await this.validator.validate(body)
      if (error) {
        return badRequest(error)
      }
      const policy = await this.authorizer.auth(body)
      return policy
    } catch (error) {
      return serverError(error)
    }
  }
}
