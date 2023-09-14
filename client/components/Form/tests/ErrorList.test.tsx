import '@testing-library/jest-dom';
import { ErrorList } from '..';
import { render } from '@testing-library/react';

describe('<ErrorList />', () => {
	describe('errors', () => {
		it('renders all passed errors', async () => {
			const errors = ['one', 'two', 'three'];
			const component = render(<ErrorList errors={errors} />);

			for (const error of errors) {
				expect(await component.findByText(error)).toBeTruthy();
			}
		});
	});
});
