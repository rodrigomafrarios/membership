import { LoadUser } from '../../../../domain/usecases/user/load-user/load-user'
import { HttpRequest, HttpResponse } from '@/presentation/interfaces/http'
import { Controller } from '../../../interfaces/controller'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class LoadUserController implements Controller {
  constructor (private readonly loadUser: LoadUser) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const user = await this.loadUser.loadById(body.id)
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
