import { HttpRequest, HttpResponse } from '../../../interfaces/http'
import { Controller } from '../../../interfaces/controller'
import { ListUsers } from '../../../../domain/usecases/user/list-users/list-users'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class ListUsersController implements Controller {
  constructor (private readonly listUsers: ListUsers) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const users = await this.listUsers.list()
      return ok(users)
    } catch (error) {
      return serverError(error)
    }
  }
}
