import { AddUser } from '../../../../domain/usecases/user/add-user/add-user'
import { Login } from '../../../../domain/usecases/login/login'
import { EmailInUseError } from '../../../errors/email-in-use-error'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../interfaces/controller'
import { HttpRequest, HttpResponse } from '../../../interfaces/http'
import { Validation } from '../../../interfaces/validation'

export class AddUserController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly addUser: AddUser,
    private readonly login: Login
    ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const error = await this.validator.validate(body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password, role } = body

      const user = await this.addUser.add({
        name,
        email,
        password,
        role
      })

      if (!user) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.login.getToken({
        email,
        password
      })

      return ok({ name, accessToken })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
