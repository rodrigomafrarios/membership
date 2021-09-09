import { HttpRequest, HttpResponse } from '../../../interfaces/http'
import { Controller } from '../../../interfaces/controller'
import { LoadOrganization } from '../../../../domain/usecases/organization/load-organization/load-organization'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class LoadOrganizationController implements Controller {
  constructor (private readonly loadOrganization: LoadOrganization) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const organizations = await this.loadOrganization.load(body.organizationId)
      return ok(organizations)
    } catch (error) {
      return serverError(error)
    }
  }
}
