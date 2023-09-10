import React from 'react';
import styles from './Button.module.scss';
import { LoadingSpinner } from '../LoadingSpinner';

export type ButtonProps = {
	className?: string;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	label: string;
	loading?: boolean;
	primary?: boolean;
	Icon: React.FunctionComponent<{ className?: string }>;
};

export function Button({
	className,
	type = 'submit',
	onClick,
	label,
	loading,
	primary,
	Icon,
}: ButtonProps) {
	const finalClassName = [
		styles.button,
		primary && styles.primary,
		loading && styles.loading,
		className,
	].join(' ');

	return (
		<button type={type} className={finalClassName} onClick={onClick}>
			{label} <Icon className="w-5 h-5 ml-2 text-" />
			{loading && (
				<LoadingSpinner className="absolute text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
			)}
		</button>
	);
}
