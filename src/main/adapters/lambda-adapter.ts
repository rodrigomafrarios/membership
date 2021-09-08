import { formatJSONResponse } from '../libs/apiGateway'
import { HttpRequest, HttpResponse } from '../../presentation/interfaces/http'

export const lambdaAdapt = (controller: any) => {
	return async (data: any) => {
		const httpRequest: HttpRequest = {}
		if (data?.body) {
			httpRequest.body = data.body
			if (typeof data.body === 'string') {
				httpRequest.body = JSON.parse(data.body)
			}
		}
		const httpResponse: HttpResponse = await controller.handle(httpRequest)
		return formatJSONResponse(httpResponse)
	}
}
