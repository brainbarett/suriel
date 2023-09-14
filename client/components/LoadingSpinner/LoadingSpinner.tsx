/** @see https://github.com/n3r4zzurr0/svg-spinners/blob/main/svg-css/ring-resize.svg?short_path=951875e */

type LoadingSpinnerProps = {
	className: string;
	size?: 'xs' | 'sm' | 'base' | 'lg';
};

const sizeObj: { [size in NonNullable<LoadingSpinnerProps['size']>]: number } =
	{
		xs: 16,
		sm: 20,
		base: 24,
		lg: 28,
	};

export function LoadingSpinner({
	className,
	size = 'base',
}: LoadingSpinnerProps) {
	const sizeInt = sizeObj[size];
	const finalClassName = ['loading-spinner', className].join(' ');

	return (
		<svg
			width={sizeInt}
			height={sizeInt}
			stroke="#000"
			viewBox={[0, 0, sizeInt, sizeInt].join(' ')}
			xmlns="http://www.w3.org/2000/svg"
			className={finalClassName}
		>
			<style
				dangerouslySetInnerHTML={{
					__html: '.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}',
				}}
			/>
			<g className="spinner_V8m1">
				<circle
					cx={12}
					cy={12}
					r="9.5"
					fill="none"
					strokeWidth={3}
					stroke="currentColor"
				/>
			</g>
		</svg>
	);
}
