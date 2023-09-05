import { ZodError } from 'zod';

export type ValidationErrorsBag = { [field: string]: string[] };

export function useZodErrorsFormatter(
	zodErrors: ZodError<{ [field: string]: any }>
): ValidationErrorsBag {
	const zodErrorsBag = zodErrors.format();
	const errors: ValidationErrorsBag = {};

	for (const field in zodErrorsBag) {
		errors[field] =
			zodErrorsBag[field as keyof typeof zodErrorsBag]!._errors;
	}

	return errors;
}
