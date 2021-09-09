export enum UserRole {
	sysadmin = 'SYSADMIN',
	orgadmin = 'ORGADMIN',
	orguser = 'ORGUSER',
	user 		 = 'USER'
}

export interface UserModel {
	id: string
	name: string
	email: string
	password: string
	role: UserRole.sysadmin | UserRole.orgadmin | UserRole.orguser | UserRole.user
	accessToken?: string
}

type UserWithoutPassword = Omit<UserModel, 'password'>

export type UserWithoutCredentials = Omit<UserWithoutPassword, 'accessToken'>
