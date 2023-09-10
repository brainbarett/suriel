import { Request, Response } from 'express';
import { z } from 'zod';
import { exists, useZodErrorsFormatter } from '../utils/validation';
import { HttpBadRequestError, ValidationError } from '../http-errors';
import Users from '@/models/users';
import hash from '@/utils/hash';

const validator = z.object({
	email: z
		.string()
		.email()
		.refine(...exists(Users, 'email')),
	password: z.string().nonempty(),
});

export type LoginRequest = z.infer<typeof validator>;

async function validate(data: { [key: string]: any }): Promise<LoginRequest> {
	const validated = await validator.safeParseAsync(data);

	if (!validated.success) {
		const errors = useZodErrorsFormatter(validated.error);
		throw ValidationError.withMessages(errors);
	}

	return validated.data;
}

export default {
	async login(req: Request, res: Response) {
		const credentials = await validate(req.body);

		const user = (await Users.findOne({
			where: { email: credentials.email },
		})) as Users;

		if (!hash.check(credentials.password, user.password)) {
			throw new HttpBadRequestError('Invalid credentials');
		}

		const token = await user.generateAccessToken();

		return res.send({ data: { token: token.plainTextToken } });
	},

	async authenticated(req: Request, res: Response) {
		return res.send({ data: req.auth!.user });
	},

	async logout(req: Request, res: Response) {
		await req.auth!.token.destroy();

		return res.status(204).send();
	},
};
