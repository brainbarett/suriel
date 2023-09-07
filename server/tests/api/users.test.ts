import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import app from '@/app';
import { StoreRequest } from '@/http/controllers/users.controller';
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

	test('can create a new user', async () => {
		const payload: StoreRequest = await factory.attrs(Users.tableName);

		const response = await request.post('/users').send(payload).expect(201);

		const body: ApiResponse<UsersResource> = response.body;

		const user = await Users.findByPk(body.data.id);
		expect(user).not.toBeNull();
		expectModelAttributes(user!, payload);
	});
});
