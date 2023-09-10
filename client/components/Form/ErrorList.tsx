export type ErrorListProps = {
	className?: string;
	errors: string[];
};

export function ErrorList({ className, errors }: ErrorListProps) {
	const finalClassName = ['mt-1', className].join(' ');

	return (
		<div className={finalClassName}>
			{errors.map((error, index) => (
				<p className="text-xs text-red-400" key={index}>
					{error}
				</p>
			))}
		</div>
	);
}
