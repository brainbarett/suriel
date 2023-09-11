import http, { Response } from './internal-http';
import { AxiosPromise } from 'axios';

const baseUrl: string = '/auth';

export default {
	login(data: LoginRequest): AxiosPromise<Response<{ token: string }>> {
		return http.post(`${baseUrl}/login`, data);
	},
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type User = {
	id: number;
	name: string;
	email: string;
};
