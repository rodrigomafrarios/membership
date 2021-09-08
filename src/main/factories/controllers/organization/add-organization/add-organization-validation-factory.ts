import { ValidationComposite, RequiredFieldValidation } from '../../../../../presentation/helpers/validators'
import { Validation } from '../../../../../presentation/interfaces/validation'

export const makeAddOrganizationValidation = (): ValidationComposite => {
	const validations: Validation[] = []
	for (const field of ['organizationId', 'name']) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
