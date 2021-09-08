import { Validation } from '@/presentation/interfaces/validation'

export const makeValidation = (): Validation => {
	class ValidationStub implements Validation {
		validate (): any {
			return null
		}
	}
	return new ValidationStub()
}
