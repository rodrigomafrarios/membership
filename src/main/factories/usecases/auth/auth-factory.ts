import { AWSAuthorizer } from '../../../../data/usecases/auth/auth'
import { Authorizer } from '../../../../domain/usecases/auth/authorizer'
import { AWSPolicyGenerator } from '../../../../infra/aws/policy-generator'
import { JwtAdapter } from '../../../../infra/criptography/jwt/jwt-adapter'
import { UserRole } from '../../../../domain/models/user'

export const makeSysAdminAWSAuthorizer = (): Authorizer => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const policyGenerator = new AWSPolicyGenerator()
  return new AWSAuthorizer(jwtAdapter, policyGenerator, [UserRole.sysadmin])
}

export const makeOrgAdminAWSAuthorizer = (): Authorizer => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const policyGenerator = new AWSPolicyGenerator()
  return new AWSAuthorizer(jwtAdapter, policyGenerator, [UserRole.sysadmin, UserRole.orgadmin])
}

export const makeOrgUserAWSAuthorizer = (): Authorizer => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const policyGenerator = new AWSPolicyGenerator()
  return new AWSAuthorizer(jwtAdapter, policyGenerator, [UserRole.sysadmin, UserRole.orgadmin, UserRole.orguser])
}

export const makeUserAWSAuthorizer = (): Authorizer => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const policyGenerator = new AWSPolicyGenerator()
  return new AWSAuthorizer(jwtAdapter, policyGenerator, [UserRole.sysadmin, UserRole.orgadmin, UserRole.orguser, UserRole.user])
}
