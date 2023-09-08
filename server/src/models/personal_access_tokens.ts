import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	ForeignKey,
} from 'sequelize';
import { sequelize } from '@/app';
import hash from '@/utils/hash';
import Users from './users';
import crypto from 'crypto';

class PersonalAccessTokens extends Model<
	InferAttributes<PersonalAccessTokens>,
	InferCreationAttributes<PersonalAccessTokens>
> {
	declare id: CreationOptional<number>;

	declare user_id: ForeignKey<Users['id']>;
	declare token: string;

	static async generateTokenForUser(id: number) {
		const plainTextToken = crypto.randomBytes(20).toString('hex');
		const accessToken = await this.create({
			user_id: id,
			token: plainTextToken,
		});

		return {
			plainTextToken,
			accessToken,
		};
	}

	declare expires_at: CreationOptional<Date>;
	declare last_used_at: CreationOptional<Date>;

	declare created_at: CreationOptional<Date>;
	declare updated_at: CreationOptional<Date>;
}

PersonalAccessTokens.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},

		token: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value: string) {
				this.setDataValue('token', hash.make(value));
			},
		},

		expires_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: () => {
				const date = new Date();
				date.setDate(date.getDate() + 1);
				return date.toISOString().slice(0, 19).replace('T', ' ');
			},
		},
		last_used_at: DataTypes.DATE,

		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE,
	},
	{
		sequelize,
		tableName: 'personal_access_tokens',
	}
);

export default PersonalAccessTokens;
