import { Decrypter, DecrypterResult } from '@/data/interfaces/criptography/decrypter'
import { UserRole } from '@/domain/models/user'

export const mockToEncrypt = () => {
  return JSON.stringify({
    userId: 'any_decrypted_user',
    userRole: UserRole.sysadmin
  })
}

export const mockDescrypterResults = () => {
  return {
    data: mockToEncrypt()
  }
}

export const mockDecrypter = (): Decrypter => {
	class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<DecrypterResult> {
        return Promise.resolve(mockDescrypterResults())
    }
	}
	return new DecrypterStub()
}
