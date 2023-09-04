import dotenv from 'dotenv';
dotenv.config({ path: '.env.testing' });

import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
	extensionsToTreatAsEsm: ['.ts'],
	transform: {
		'^.+\\.(ts|tsx)?$': [
			'ts-jest',
			{
				isolatedModules: true,
				useESM: true,
			},
		],
	},
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>',
	}),
	maxWorkers: 1,
};

export default config;
