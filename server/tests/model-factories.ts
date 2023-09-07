import { beforeAll } from '@jest/globals';
import { glob } from 'glob';
import path from 'path';

async function importFactories() {
	const files = glob.sync('database/factories/**/*.factory.ts');

	for (const file of files) {
		await import(path.resolve(file));
	}
}

export default () => {
	beforeAll(async () => {
		await importFactories();
	});
};
