export interface UserModel {
	id: string
	name: string
	email: string
	password: string
	role: string
	accessToken?: string
}

type UserWithoutPassword = Omit<UserModel, 'password'>

export type UserWithoutCredentials = Omit<UserWithoutPassword, 'accessToken'>
