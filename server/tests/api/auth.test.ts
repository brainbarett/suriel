import app from '@/app';
import { beforeEach, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import useRefreshDatabase from '../refresh-database';
import useModelFactories from '../model-factories';
import Users from '@/models/users';
import factory from '../../database/factories/factory';
import { ApiResponse } from '@/http/types';
import hash from '@/utils/hash';

const request = supertest(app);

describe('/auth', () => {
	useRefreshDatabase();
	useModelFactories();

	let user: Users;

	beforeEach(async () => {
		user = (await factory.create(Users.tableName, {
			password: 'password',
		})) as Users;
	});

	test('can login', async () => {
		const response = await request
			.post('/auth/login')
			.send({ email: user.email, password: 'password' })
			.expect(200);

		const body: ApiResponse<{ token: string }> = response.body;

		const userAccessTokens = await user.getAccessTokens();
		expect(userAccessTokens.length).toBe(1);
		expect(hash.check(body.data.token, userAccessTokens[0].token)).toBe(
			true
		);
	});

	test('can check we are logged in', async () => {
		const { plainTextToken } = await user.generateAccessToken();

		const response = await request
			.get('/auth/authenticated')
			.set({ Authorization: `Bearer ${plainTextToken}` })
			.expect(200);

		const body: ApiResponse<Users> = response.body;

		expect(body.data.id).toEqual(user.id);
	});

	test('logging out makes the token unusable', async () => {
		const { plainTextToken } = await user.generateAccessToken();

		await request
			.post('/auth/logout')
			.set({ Authorization: `Bearer ${plainTextToken}` })
			.expect(204);

		await request
			.get('/auth/authenticated')
			.set({ Authorization: `Bearer ${plainTextToken}` })
			.expect(401);
	});
});
