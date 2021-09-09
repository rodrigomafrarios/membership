import { HttpRequest, HttpResponse } from '../../../interfaces/http'
import { Controller } from '../../../interfaces/controller'
import { Validation } from '../../../interfaces/validation'
import { badRequest, created, serverError } from '../../../helpers/http/http-helper'
import { AddOrganization } from '../../../../domain/usecases/organization/add-organization/add-organization'

export class AddOrganizationController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly addOrganization: AddOrganization
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const error = this.validator.validate(body)
      if (error) {
        return badRequest(error)
      }
      body.organizationId = body.organizationId.replace(/\D/g, '')
      const saved = await this.addOrganization.add(body)
      if (!saved) {
        return badRequest(new Error())
      }
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
