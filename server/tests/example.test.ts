import { expect, test } from '@jest/globals';
import supertest from 'supertest';
import app from '@/app';

const request = supertest(app);

test('example', async () => {
	const response = await request.get('/').expect(200);
});
