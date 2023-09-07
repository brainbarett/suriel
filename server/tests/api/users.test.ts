import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import app from '@/app';
import {
	StoreRequest,
	UpdateRequest,
} from '@/http/controllers/users.controller';
import useRefreshDatabase from '../refresh-database';
import Users from '@/models/users';
import { Attributes } from 'sequelize';
import { ApiResponse } from '@/http/types';
import { UsersResource } from '@/http/resources/users.resource';
import hash from '@/utils/hash';
import factory from '../../database/factories/factory';
import useModelFactories from '../model-factories';

const request = supertest(app);

function expectModelAttributes(
	user: Users,
	attributes: Partial<Attributes<Users>>
) {
	for (const [attribute, value] of Object.entries(attributes)) {
		switch (attribute) {
			case 'password':
				expect(hash.check(value as string, user[attribute])).toBe(true);
				break;

			default:
				expect(user[attribute as keyof Attributes<Users>]).toEqual(
					value
				);
				break;
		}
	}
}

describe('/users', () => {
	useRefreshDatabase();
	useModelFactories();

	test('can get a specific user', async () => {
		const user: Users = await factory.create(Users.tableName);

		const response = await request.get(`/users/${user.id}`).expect(200);

		const body: ApiResponse<UsersResource> = response.body;

		expect(body.data.id).toEqual(user.id);
	});

	test('can get users index', async () => {
		const users: Users[] = await factory.createMany(Users.tableName, 5);

		const response = await request.get('/users').expect(200);

		const body: ApiResponse<UsersResource[]> = response.body;

		expect(body.data.map(user => user.id).sort()).toEqual(
			users.map(user => user.id).sort()
		);
	});

	test('can create a new user', async () => {
		const payload: StoreRequest = await factory.attrs(Users.tableName);

		const response = await request.post('/users').send(payload).expect(201);

		const body: ApiResponse<UsersResource> = response.body;

		const user = await Users.findByPk(body.data.id);
		expect(user).not.toBeNull();
		expectModelAttributes(user!, payload);
	});

	test('can update a user', async () => {
		const user: Users = await factory.create(Users.tableName);
		const payload: UpdateRequest = await factory.attrs(Users.tableName);

		const response = await request
			.put(`/users/${user.id}`)
			.send(payload)
			.expect(200);

		const body: ApiResponse<UsersResource> = response.body;

		expectModelAttributes(await user.reload(), payload);
	});

	test('can destroy a user', async () => {
		const user: Users = await factory.create(Users.tableName);

		await request.delete(`/users/${user.id}`).expect(204);

		expect(await Users.findByPk(user.id)).toBeNull();
	});
});
