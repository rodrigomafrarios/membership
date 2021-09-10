import { Encrypter } from '../../../data/interfaces/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string): Promise<string> {
    return jwt.sign({ data: plaintext }, this.secret)
  }

  async decrypt (ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
