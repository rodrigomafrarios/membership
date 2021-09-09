import { UserRole } from '../domain/models/user'
import { RoleValidator } from '../presentation/interfaces/role-validator'

export class RoleValidatorAdapter implements RoleValidator {
	isValid (role: string): boolean {
		if (role !== UserRole.sysadmin && role !== UserRole.orgadmin && role !== UserRole.orguser && role !== UserRole.user) {
			return false
		}
		return true
	}
}
