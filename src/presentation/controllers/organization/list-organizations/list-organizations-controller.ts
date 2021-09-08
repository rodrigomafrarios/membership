import { ListOrganizations } from '../../../../domain/usecases/organization/list-organizations/list-organizations'
import { HttpRequest, HttpResponse } from '@/presentation/interfaces/http'
import { Controller } from '../../../interfaces/controller'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class ListOrganizationsController implements Controller {
  constructor (private readonly listOrganizations: ListOrganizations) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const organizations = await this.listOrganizations.list()
      return ok(organizations)
    } catch (error) {
      return serverError(error)
    }
  }
}
