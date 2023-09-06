import { Sequelize } from 'sequelize';
import process from 'process';

export default new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT!,
	database: process.env.DB_DATABASE,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	define: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	logging: false,
});
