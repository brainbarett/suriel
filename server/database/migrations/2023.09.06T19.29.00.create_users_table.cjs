const DataTypes = require('sequelize').DataTypes;

module.exports = {
	/** @type {import('../../src/services/umzug').Migration} */
	up: async ({ context: sequelize }) => {
		await sequelize.getQueryInterface().createTable('users', {
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},

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
		await sequelize.getQueryInterface().dropTable('users');
	},
};
