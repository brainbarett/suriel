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
