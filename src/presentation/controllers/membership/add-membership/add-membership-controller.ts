import { HttpRequest, HttpResponse } from '../../../interfaces/http'
import { Controller } from '../../../interfaces/controller'
import { Validation } from '../../../interfaces/validation'
import { badRequest, created, serverError } from '../../../helpers/http/http-helper'
import { AddMembership } from '../../../../domain/usecases/membership/add-membership/add-membership'

export class AddMembershipController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly addMembership: AddMembership
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const error = this.validator.validate(body)
      if (error) {
        return badRequest(error)
      }
      body.organizationId = body.organizationId.replace(/\D/g, '')
      const saved = await this.addMembership.add(body)
      if (!saved) {
        return badRequest(new Error())
      }
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
