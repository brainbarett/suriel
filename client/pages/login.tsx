import { UserCircleIcon } from '@heroicons/react/24/solid';
import {
	LockClosedIcon,
	AtSymbolIcon,
	ArrowRightIcon,
} from '@heroicons/react/24/outline';
import styles from './login.module.scss';
import { Button } from '@/components/Button';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Field as FormField, ErrorList } from '@/components/Form';
import AuthApi from '@/services/auth';
import { AxiosResponse } from 'axios';
import {
	ErrorResponse,
	ValidationErrorResponse,
} from '@/services/internal-http';
import { useDispatch } from '@/utils/hooks/redux';
import { setToken } from '@/stores/auth';

export default function Login() {
	return (
		<div className="box-border flex flex-col items-center justify-center w-full min-h-screen p-6 bg-gray-100">
			<div className="bg-white rounded shadow-md max-w-full w-[400px]">
				<div className="relative pb-28">
					<div className="bg-gray-600 h-28" />
					<div className="absolute p-2 text-gray-600 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2 drop-shadow-lg">
						<UserCircleIcon className="w-28 h-28" />
					</div>
				</div>

				<LoginForm />
			</div>
		</div>
	);
}

type FormData = {
	email: string;
	password: string;
};
function LoginForm() {
	const { register, onSubmit, errors, loading } = useLoginForm();

	return (
		<form onSubmit={onSubmit} className="box-border p-6 pt-0 -mt-5">
			<h1 className="mb-6 text-2xl font-bold text-center">
				Welcome back!
			</h1>

			<FormField
				className={styles['login-form__input-container']}
				errors={errors.email && [errors.email.message!.toString()]}
			>
				<LockClosedIcon />
				<input
					{...register('email')}
					type="email"
					placeholder="email@hello.com"
				/>
			</FormField>

			<FormField
				className={styles['login-form__input-container']}
				errors={
					errors.password && [errors.password.message!.toString()]
				}
			>
				<AtSymbolIcon />
				<input {...register('password')} type="password" />
			</FormField>

			<Button
				label="Log in"
				loading={loading}
				primary
				Icon={ArrowRightIcon}
				className="w-full py-2"
			/>

			{errors.root && (
				<ErrorList
					className="text-center"
					errors={[errors.root.message!.toString()]}
				/>
			)}
		</form>
	);
}

const validator = z.object({
	email: z.string().email(),
	password: z.string().nonempty(),
});
function useLoginForm() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<FormData>({
		resolver: zodResolver(validator),
	});

	const onSubmit = useCallback(async (data: FormData) => {
		setLoading(true);
		clearErrors();

		await AuthApi.login(data)
			.then(res => {
				dispatch(setToken(res.data.data.token));
				alert('login success');
			})
			.catch((res: AxiosResponse<ErrorResponse>) => {
				if (res.status == 422) {
					for (const [field, errors] of Object.entries(
						(res.data as ValidationErrorResponse).errors
					)) {
						setError(field as keyof FormData, {
							message: errors[0],
						});
					}
				}

				setError('root', { message: res.data.message });
			});

		setLoading(false);
	}, []);

	return {
		register,
		onSubmit: () => handleSubmit(onSubmit),
		errors,
		loading,
	};
}
