import { Login } from '@/domain/usecases/login/login'

export const makeLogin = (): Login => {
	class LoginStub implements Login {
		async getToken (): Promise<string> {
			return Promise.resolve('any_token')
		}
	}
	return new LoginStub()
}
