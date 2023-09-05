import {
	useZodErrorsFormatter,
	ValidationErrorsBag,
} from '@/http/utils/validation';
import { expect, test } from '@jest/globals';
import { z, SafeParseError } from 'zod';

test('useZodErrorsFormatter', () => {
	const validator = z.object({
		name: z.string(),
	});

	const validated = validator.safeParse({}) as SafeParseError<
		z.infer<typeof validator>
	>;

	const errors = useZodErrorsFormatter(validated.error);
	expect(errors).toEqual({ name: ['Required'] } as ValidationErrorsBag);
});
