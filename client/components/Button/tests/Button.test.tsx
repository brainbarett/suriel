import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '..';
import { faker } from '@faker-js/faker';

describe('<Button />', () => {
	describe('onClick', () => {
		it('is called when button is clicked', async () => {
			const onClick = jest.fn();
			render(<Button label="label" onClick={onClick} />);

			fireEvent.click(await screen.findByRole('button'));

			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('disabled', () => {
		it('prevents onClick event from firing', async () => {
			const onClick = jest.fn();
			render(<Button label="label" onClick={onClick} disabled />);

			fireEvent.click(await screen.findByRole('button'));

			expect(onClick).toHaveBeenCalledTimes(0);
		});
	});

	describe('label', () => {
		it('is rendered inside the button', async () => {
			const label = faker.lorem.word();
			render(<Button label={label} />);

			expect(
				(await screen.findByRole('button')).textContent!.trim()
			).toBe(label);
		});
	});

	describe('loading', () => {
		/**
		 * cant test below since there's no method to check if a component contains another component
		 * i.e. expect().toContainReactComponent()
		 * https://github.com/testing-library/react-testing-library/issues/251#issuecomment-451263607
		 */
		it.todo('renders a spinner');
	});

	describe('icon', () => {
		/**
		 * cant test because of same issue in decribe('loading).it('renders a spinner')
		 */
		it.todo('renders the passed icon');
	});
});
