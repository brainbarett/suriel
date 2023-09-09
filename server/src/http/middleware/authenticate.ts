import { NextFunction, Request, Response } from 'express';
import { HttpUnauthorizedError } from '@/http/http-errors';
import PersonalAccessTokens from '@/models/personal_access_tokens';
import hash from '@/utils/hash';
import Users from '@/models/users';
import { Op } from 'sequelize';
import asyncHandler from 'express-async-handler';

const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const header = req.header('Authorization');

	if (!header) {
		throw new HttpUnauthorizedError();
	}

	const [authorization, token] = header.split(' ');

	if (authorization.toLowerCase() != 'bearer') {
		throw new HttpUnauthorizedError();
	}

	const accessToken = await PersonalAccessTokens.findOne({
		where: {
			token: hash.make(token),
			expires_at: {
				[Op.gt]: new Date(),
			},
		},
	});

	if (!accessToken) {
		throw new HttpUnauthorizedError();
	}

	const user = await Users.findByPk(accessToken.user_id);

	if (!user) {
		throw new HttpUnauthorizedError();
	}

	req.auth = {
		token: accessToken,
		user,
	};

	return next();
};

export default asyncHandler(authenticate);
