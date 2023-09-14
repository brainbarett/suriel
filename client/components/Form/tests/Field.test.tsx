import '@testing-library/jest-dom';
import { Field } from '..';
import { render } from '@testing-library/react';

describe('<Field />', () => {
	describe('errors', () => {
		it('renders all passed errors', async () => {
			const errors = ['one', 'two', 'three'];
			const component = render(<Field errors={errors}> </Field>);

			for (const error of errors) {
				expect(await component.findByText(error)).toBeTruthy();
			}
		});
	});
});
