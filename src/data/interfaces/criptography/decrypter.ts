export interface DecrypterResult {
	data: string
}

export interface Decrypter {
	decrypt: (value: string) => Promise<DecrypterResult>
}
