import { ModelStatic } from 'sequelize';
import { ZodError } from 'zod';

export type ValidationErrorsBag = { [field: string]: string[] };

export const useZodErrorsFormatter = (
	zodErrors: ZodError<{ [field: string]: any }>
): ValidationErrorsBag => {
	const zodErrorsBag = zodErrors.format();
	const errors: ValidationErrorsBag = {};

	for (const field in zodErrorsBag) {
		errors[field] =
			zodErrorsBag[field as keyof typeof zodErrorsBag]!._errors;
	}

	return errors;
};

export const exists = (
	model: ModelStatic<any>,
	column: string = 'id',
	message: string | null = null
) => {
	const check = async (value: string) => {
		return await model.count({
			where: {
				[column]: value,
			},
		});
	};

	message = message || `The selected ${column} is invalid`;

	return [check, message] as const;
};

export const unique = (
	model: ModelStatic<any>,
	column: string = 'id',
	message: string | null = null
) => {
	const [checkExists] = exists(model, column, message);
	const check = async (value: string) => !(await checkExists(value));

	message = message || `The ${column} has already been taken`;

	return [check, message] as const;
};
