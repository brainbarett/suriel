import { describe, beforeEach, test, expect } from '@jest/globals';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import express, { Express, Request, Response } from 'express';
import httpErrorHandler from '@/http/middleware/http-error-handler';
import { HttpError, ValidationError } from '@/http/http-errors';

describe('http-error-handler', () => {
	let app: Express;

	beforeEach(() => {
		app = express().use(express.json());
	});

	test('doesnt interrupt normal requests', async () => {
		const message = faker.lorem.sentence();
		app.get(
			'/',
			(req: Request, res: Response) => {
				return res.send(message);
			},
			httpErrorHandler
		);

		const response = await supertest(app).get('/').expect(200);

		expect(response.text).toBe(message);
	});

	test('ignores non http-errors', async () => {
		const message = faker.lorem.sentence();
		app.get(
			'/',
			() => {
				throw new Error(message);
			},
			httpErrorHandler
		);

		const response = await supertest(app).get('/').expect(500);

		expect(response.text).toContain(message);
	});

	test('catches and renders http-errors appropriately', async () => {
		const statusCode = 401;
		const message = faker.lorem.sentence();
		const error = new HttpError(message, statusCode);
		app.get(
			'/',
			() => {
				throw error;
			},
			httpErrorHandler
		);

		const response = await supertest(app).get('/').expect(statusCode);

		expect(response.body).toEqual(error.payload());
	});
});

describe('http-errors', () => {
	describe('HttpError', () => {
		test('can specify a message and status code', () => {
			const statusCode = faker.number.int(100);
			const message = faker.lorem.sentence();

			const error = new HttpError(message, statusCode);

			expect(error.statusCode).toBe(statusCode);
			expect(error.payload()).toEqual({ message });
		});

		test('has default message and status code', () => {
			const error = new HttpError();

			expect(error.statusCode).toBe(500);
			expect(error.payload()).toEqual({
				message: HttpError.defaultMessage,
			});
		});
	});

	describe('ValidationError', () => {
		test('can specify a message, status code, and validation errors', () => {
			const statusCode = faker.number.int(100);
			const message = faker.lorem.sentence();
			const validationErrors = {
				field1: [faker.lorem.sentence()],
			};

			const error = new ValidationError(
				message,
				statusCode,
				validationErrors
			);

			expect(error.statusCode).toBe(statusCode);
			expect(error.payload()).toEqual({
				message,
				errors: validationErrors,
			});
		});

		test('has default message and status code', () => {
			const error = new ValidationError();

			expect(error.statusCode).toBe(422);
			expect(error.payload()).toEqual({
				message: ValidationError.defaultMessage,
				errors: {},
			});
		});

		test('can use static .create() to only specify validation errors', () => {
			const validationErrors = {
				field1: [faker.lorem.sentence()],
			};

			const error = ValidationError.withMessages(validationErrors);

			expect(error.statusCode).toBe(422);
			expect(error.payload()).toEqual({
				message: ValidationError.defaultMessage,
				errors: validationErrors,
			});
		});
	});
});
