import { beforeEach, describe, expect, test } from '@jest/globals';
import express, { Request, Response } from 'express';
import supertest from 'supertest';
import useRefreshDatabase from '../refresh-database';
import useModelFactories from '../model-factories';
import Users from '@/models/users';
import factory from '../../database/factories/factory';
import authenticate from '@/http/middleware/authenticate';
import httpErrorHandler from '@/http/middleware/http-error-handler';

let appTemplate = express().use(express.json());
appTemplate.get(
	'/protected',
	authenticate,
	(req: Request, res: Response) => {
		return res.send({ id: req.auth!.user.id });
	},
	httpErrorHandler
);

const app = supertest(appTemplate);

describe('authenticate', () => {
	useRefreshDatabase();
	useModelFactories();

	let user: Users;

	beforeEach(async () => {
		user = (await factory.create(Users.tableName)) as Users;
	});

	test('allows authenticated requests and attaches the auth user to request', async () => {
		const { plainTextToken } = await user.generateAccessToken();

		const response = await app
			.get('/protected')
			.set({ Authorization: `Bearer ${plainTextToken}` })
			.expect(200);

		const body = response.body;

		expect(body.id).toEqual(user.id);
	});

	test('blocks requests with no auth header', async () => {
		return app.get('/protected').expect(401);
	});

	test('blocks requests with invalid auth header', async () => {
		const { plainTextToken } = await user.generateAccessToken();

		return app
			.get('/protected')
			.set({ Authorization: `Wrong ${plainTextToken}` })
			.expect(401);
	});

	test('blocks requests with invalid token', async () => {
		await user.generateAccessToken();

		return app
			.get('/protected')
			.set({ Authorization: `Bearer WrongToken` })
			.expect(401);
	});

	test('blocks request with expired token', async () => {
		const { plainTextToken, accessToken } =
			await user.generateAccessToken();

		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		await accessToken.update({ expires_at: yesterday });

		return app
			.get('/protected')
			.set({ Authorization: `Bearer ${plainTextToken}` })
			.expect(401);
	});
});
