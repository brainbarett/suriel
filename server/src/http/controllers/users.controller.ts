import { Request, Response } from 'express';
import { z } from 'zod';
import {
	HttpBadRequestError,
	ResourceNotFoundError,
	ValidationError,
} from '../http-errors';
import { unique, useZodErrorsFormatter } from '../utils/validation';
import Users from '@/models/users';
import transformToUsersResource from '../resources/users.resource';

const validator = z.object({
	name: z.string(),
	email: z
		.string()
		.email()
		.refine(...unique(Users, 'email')),
	password: z.string(),
});

export type StoreRequest = z.infer<typeof validator>;
export type UpdateRequest = StoreRequest;

async function validate(data: {
	[key: string]: any;
}): Promise<StoreRequest | UpdateRequest> {
	const validated = await validator.safeParseAsync(data);

	if (!validated.success) {
		const errors = useZodErrorsFormatter(validated.error);
		throw ValidationError.create(errors);
	}

	return validated.data;
}

async function findOrFail(id: any): Promise<Users> {
	id = Number(id);
	if (!Number.isInteger(id)) {
		throw new HttpBadRequestError();
	}

	const user = await Users.findByPk(id);
	if (!user) {
		throw new ResourceNotFoundError();
	}

	return user;
}

export default {
	async index(req: Request, res: Response) {
		const users = await Users.findAll();

		return res.send({
			data: users.map(user => transformToUsersResource(user)),
		});
	},

	async show(req: Request, res: Response) {
		const user = await findOrFail(req.params.user);

		return res.send({ data: transformToUsersResource(user) });
	},

	async store(req: Request, res: Response) {
		const user = await Users.create(await validate(req.body));

		return res.status(201).send({ data: transformToUsersResource(user) });
	},

	async update(req: Request, res: Response) {
		const user = await findOrFail(req.params.user);

		await user.update(await validate(req.body));

		return res.send({ data: transformToUsersResource(user) });
	},

	async destroy(req: Request, res: Response) {
		const user = await findOrFail(req.params.user);

		await user.destroy();

		return res.status(204).send();
	},
};
