import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
import { sequelize } from '@/app';
import hash from '@/utils/hash';

class Users extends Model<
	InferAttributes<Users>,
	InferCreationAttributes<Users>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare email: string;
	declare password: string;

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

export default Users;
