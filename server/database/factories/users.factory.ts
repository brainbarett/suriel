import Users from '@/models/users';
import { faker } from '@faker-js/faker';
import factory from './factory';
import { CreationAttributes } from 'sequelize';

factory.define<CreationAttributes<Users>>(Users.tableName, Users, {
	name: faker.person.fullName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
});
