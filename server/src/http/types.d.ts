import PersonalAccessTokens from '@/models/personal_access_tokens';
import Users from '@/models/users';

declare global {
	namespace Express {
		interface Request {
			auth?: {
				token: PersonalAccessTokens;
				user: Users;
			};
		}
	}
}

export interface ApiResponse<TData = Object | Object[]> {
	data: TData;
}
