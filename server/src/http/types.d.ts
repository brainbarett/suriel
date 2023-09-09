import Users from '@/models/users';

declare global {
	namespace Express {
		interface Request {
			auth?: Users;
		}
	}
}

export interface ApiResponse<TData = Object | Object[]> {
	data: TData;
}
