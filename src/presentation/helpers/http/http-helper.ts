import { ServerError } from '../../errors/server-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'
import { HttpResponse } from '../../interfaces/http'

export const badRequest = (error: Error): HttpResponse => {
	return {
		statusCode: 400,
		body: error
	}
}

export const unauthorized = (): HttpResponse => {
	return {
		statusCode: 401,
		body: new UnauthorizedError()
	}
}

export const serverError = (error: Error): HttpResponse => {
	return {
		statusCode: 500,
		body: new ServerError(error.stack)
	}
}

export const ok = (data: any): HttpResponse => {
	return {
		statusCode: 200,
		body: data
	}
}

export const created = (): HttpResponse => {
	return {
		statusCode: 201,
		body: null
	}
}

export const forbidden = (error: Error): HttpResponse => {
	return {
		statusCode: 403,
		body: error
	}
}
