import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	NonAttribute,
	HasManyGetAssociationsMixin,
} from 'sequelize';
import { sequelize } from '@/app';
import hash from '@/utils/hash';
import PersonalAccessTokens from './personal_access_tokens';

class Users extends Model<
	InferAttributes<Users>,
	InferCreationAttributes<Users>
> {
	declare id: CreationOptional<number>;

	declare name: string;
	declare email: string;
	declare password: string;

	declare accessTokens?: NonAttribute<PersonalAccessTokens[]>;
	declare getAccessTokens: HasManyGetAssociationsMixin<PersonalAccessTokens>;

	generateAccessToken() {
		return PersonalAccessTokens.generateTokenForUser(this.id);
	}

	declare created_at: CreationOptional<Date>;
	declare updated_at: CreationOptional<Date>;
}

Users.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value: string) {
				this.setDataValue('password', hash.make(value));
			},
		},

		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE,
	},
	{
		sequelize,
		tableName: 'users',
	}
);

Users.hasMany(PersonalAccessTokens, {
	foreignKey: 'user_id',
	as: 'accessTokens',
});

export default Users;
