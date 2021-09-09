import { RoleValidator } from '../../interfaces/role-validator'
import { Validation } from '../../interfaces/validation'
import { InvalidParamError } from '../../errors/invalid-param-errors'

export class RoleValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly roleValidator: RoleValidator
  ) {}

  validate (input: any): Error | undefined {
    const isValid = this.roleValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
