import { Request, Response } from 'express';
import { z } from 'zod';
import {
	HttpBadRequestError,
	ResourceNotFoundError,
	ValidationError,
} from '../http-errors';
import { useZodErrorsFormatter } from '../utils/validation';
import Users from '@/models/users';
import transformToUsersResource from '../resources/users.resource';

const validator = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

export type StoreRequest = z.infer<typeof validator>;
export type UpdateRequest = StoreRequest;

function validate(data: Object): StoreRequest | UpdateRequest {
	const validated = validator.safeParse(data);

	if (!validated.success) {
		const errors = useZodErrorsFormatter(validated.error);
		throw ValidationError.create(errors);
	}

	return validated.data;
}

export default {
	async index(req: Request, res: Response) {
		const users = await Users.findAll();

		return res.send({
			data: users.map(user => transformToUsersResource(user)),
		});
	},

	async store(req: Request, res: Response) {
		const user = await Users.create(validate(req.body));

		return res.status(201).send({ data: transformToUsersResource(user) });
	},

	async update(req: Request, res: Response) {
		const id = Number(req.params.user);
		if (!Number.isInteger(id)) {
			throw new HttpBadRequestError();
		}

		const user = await Users.findByPk(id);
		if (!user) {
			throw new ResourceNotFoundError();
		}

		await user.update(validate(req.body));

		return res.send({ data: transformToUsersResource(user) });
	},
};
