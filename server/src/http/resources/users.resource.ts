import Users from '@/models/users';
import { Attributes } from 'sequelize';

export type UsersResource = {
	id: number;
	name: string;
	email: string;
};

export default (entity: Attributes<Users>): UsersResource => ({
	id: entity.id,
	name: entity.name,
	email: entity.email,
});
