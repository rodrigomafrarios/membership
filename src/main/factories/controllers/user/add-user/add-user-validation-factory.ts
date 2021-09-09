import { ValidationComposite, RequiredFieldValidation, EmailValidation, RoleValidation } from '../../../../../presentation/helpers/validators'
import { Validation } from '../../../../../presentation/interfaces/validation'
import { EmailValidatorAdapter } from '../../../../../utils/email-validator-adapter'
import { RoleValidatorAdapter } from '../../../../../utils/role-validator-adapter'

export const makeAddUserValidation = (): ValidationComposite => {
	const validations: Validation[] = []
	for (const field of ['email','password', 'name', 'role']) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
	validations.push(new RoleValidation('role', new RoleValidatorAdapter()))
	return new ValidationComposite(validations)
}
