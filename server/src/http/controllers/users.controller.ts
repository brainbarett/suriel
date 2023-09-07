import { Request, Response, Send } from 'express';
import { z } from 'zod';
import { ValidationError } from '../http-errors';
import { useZodErrorsFormatter } from '../utils/validation';
import Users from '@/models/users';
import transformToUsersResource from '../resources/users.resource';

const validator = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

export type StoreRequest = z.infer<typeof validator>;

function validate(data: Object): StoreRequest {
	const validated = validator.safeParse(data);

	if (!validated.success) {
		const errors = useZodErrorsFormatter(validated.error);
		throw ValidationError.create(errors);
	}

	return validated.data;
}

export default {
	async store(req: Request, res: Response) {
		const user = await Users.create(validate(req.body));

		return res.status(201).send({ data: transformToUsersResource(user) });
	},
};
