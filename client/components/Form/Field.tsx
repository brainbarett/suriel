import { ErrorList } from '.';

export type FieldProps = {
	className?: string;
	children: React.ReactNode;
	errors?: string[];
};

export function Field({ className, errors, children }: FieldProps) {
	const finalClassName = ['relative flex flex-col', className].join(' ');

	return (
		<div className={finalClassName}>
			{children}
			{errors && <ErrorList errors={errors} />}
		</div>
	);
}
