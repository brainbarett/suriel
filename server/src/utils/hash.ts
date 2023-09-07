import bcrypt from 'bcrypt';
import process from 'process';

export default {
	getSalt() {
		const appKey = process.env.APP_KEY;

		if (!appKey) {
			throw new Error('APP_KEY has not been set');
		}

		return '$2b$10$' + appKey;
	},

	make(plaintext: string) {
		return bcrypt.hashSync(plaintext, this.getSalt());
	},

	check(plaintext: string, hashed: string) {
		return bcrypt.compareSync(plaintext, hashed);
	},
};
