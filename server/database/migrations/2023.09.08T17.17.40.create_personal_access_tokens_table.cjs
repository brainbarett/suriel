// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataTypes = require('sequelize').DataTypes;

module.exports = {
	/** @type {import('../../src/services/umzug').Migration} */
	up: async ({ context: sequelize }) => {
		await sequelize
			.getQueryInterface()
			.createTable('personal_access_tokens', {
				id: {
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					primaryKey: true,
					autoIncrement: true,
				},

				user_id: {
					type: DataTypes.INTEGER.UNSIGNED,
					references: {
						model: 'users',
						key: 'id',
					},
					onDelete: 'CASCADE',
					allowNull: false,
				},

				token: {
					type: DataTypes.STRING,
					allowNull: false,
				},

				expires_at: {
					type: 'TIMESTAMP',
					defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
				/**
				 * for some reason type: 'TIMESTAMP' doesnt let you use null as a default val
				 * I tried defautlValue: null, 'NULL', sequelize.literal('NULL'), and not specifying it
				 * so we'll use DATE instead, which generates a datetime column
				 * this is an umzug limitation
				 */
				last_used_at: DataTypes.DATE,

				created_at: {
					type: 'TIMESTAMP',
					defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
				updated_at: {
					type: 'TIMESTAMP',
					defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			});
	},

	/** @type {import('../../src/services/umzug').Migration} */
	down: async ({ context: sequelize }) => {
		await sequelize.getQueryInterface().dropTable('personal_access_tokens');
	},
};
