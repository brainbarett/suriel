import { sequelize } from '@/app';
import umzug from '@/services/umzug';
import { afterAll, afterEach, beforeEach } from '@jest/globals';

export default () => {
	beforeEach(async () => {
		await umzug.up();
	});

	afterEach(async () => {
		await umzug.down({ to: 0 });
	});

	afterAll(async () => await sequelize.close());
};
