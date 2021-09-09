import { HttpRequest, HttpResponse } from '../../../interfaces/http'
import { Controller } from '../../../interfaces/controller'
import { ListMemberships } from '../../../../domain/usecases/membership/list-memberships/list-memberships'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class ListMembershipsController implements Controller {
  constructor (private readonly listMemberships: ListMemberships) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const memberships = await this.listMemberships.listByOrganizationId(body.organizationId)
      return ok(memberships)
    } catch (error) {
      return serverError(error)
    }
  }
}
