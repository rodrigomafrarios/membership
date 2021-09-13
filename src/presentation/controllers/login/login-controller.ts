import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'
import { Controller } from '../../interfaces/controller'
import { HttpRequest, HttpResponse } from '../../interfaces/http'
import { Validation } from '../../interfaces/validation'
import { Login } from '../../../domain/usecases/login/login'

export class LoginController implements Controller {
	constructor (private readonly login: Login, private readonly validation: Validation) {}

	async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest.body)
			if (error) {
				return badRequest(error)
			}
			const { email, password } = httpRequest.body
			const accessToken = await this.login.getToken({ email, password })
			if (!accessToken) {
				return unauthorized()
			}
			return ok({ accessToken: accessToken })
		} catch (error) {
			return serverError(error)
		}
	}
}
