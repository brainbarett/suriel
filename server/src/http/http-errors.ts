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
	errors: { [field: string]: string[] };

	constructor(
		message: string = ValidationError.defaultMessage,
		statusCode: number = 422,
		errors: ValidationError['errors'] = {}
	) {
		super(message, statusCode);

		this.name = 'ValidationError';
		this.errors = errors;
	}

	payload() {
		return { message: this.message, errors: this.errors };
	}

	static create(errors: ValidationError['errors'] = {}) {
		return new ValidationError(ValidationError.defaultMessage, 422, errors);
	}
}
