import axios, { AxiosError } from 'axios';
import store from '@/stores';

const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
});

store.subscribe(() => {
	const token = store.getState().auth.token;
	http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
});

http.interceptors.response.use(
	response => response,
	(error: AxiosError) => Promise.reject(error.response)
);

export default http;

export interface Response<TEntity = object | object[]> {
	data: TEntity;
}

export interface ErrorResponse {
	message: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
	errors: {
		[field: string]: string[];
	};
}
