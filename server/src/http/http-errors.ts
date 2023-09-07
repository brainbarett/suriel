import { ValidationErrorsBag } from './utils/validation';

export class HttpError extends Error {
	static defaultMessage = 'Something went wrong';
	statusCode: number;

	constructor(
		message: string = HttpError.defaultMessage,
		statusCode: number = 500
	) {
		super(message);

		this.name = 'HttpError';
		this.statusCode = statusCode;
	}

	payload(): string | { [key: string]: any } {
		return { message: this.message };
	}
}

export class HttpBadRequestError extends HttpError {
	static defaultMessage = 'Bad request';

	constructor(
		message: string = HttpBadRequestError.defaultMessage,
		statusCode: number = 400
	) {
		super(message, statusCode);

		this.name = 'HttpBadRequestError';
	}
}

export class HttpNotFoundError extends HttpError {
	static defaultMessage = 'Not found';

	constructor(
		message: string = HttpNotFoundError.defaultMessage,
		statusCode: number = 404
	) {
		super(message, statusCode);

		this.name = 'HttpNotFoundError';
	}
}

export class ResourceNotFoundError extends HttpNotFoundError {
	static defaultMessage = 'Resource not found';

	constructor(
		message: string = ResourceNotFoundError.defaultMessage,
		statusCode: number = 404
	) {
		super(message, statusCode);

		this.name = 'ResourceNotFoundError';
	}
}

export class ValidationError extends HttpError {
	static defaultMessage = 'The given data was invalid';
	errors: ValidationErrorsBag;

	constructor(
		message: string = ValidationError.defaultMessage,
		statusCode: number = 422,
		errors: ValidationErrorsBag = {}
	) {
		super(message, statusCode);

		this.name = 'ValidationError';
		this.errors = errors;
	}

	payload() {
		return { message: this.message, errors: this.errors };
	}

	static create(errors: ValidationErrorsBag = {}) {
		return new ValidationError(ValidationError.defaultMessage, 422, errors);
	}
}
