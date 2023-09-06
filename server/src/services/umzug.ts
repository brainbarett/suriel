import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import sequelize from './sequelize';
import { pathToFileURL } from 'url';

const umzug = new Umzug({
	migrations: {
		glob: 'migrations/*.cjs',
	},
	context: sequelize,
	storage: new SequelizeStorage({ sequelize }),
	logger: undefined,
});

export type Migration = typeof umzug._types.migration;

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	umzug.runAsCLI();
}

export default umzug;
