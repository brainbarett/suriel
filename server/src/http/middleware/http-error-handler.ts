import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@/http/http-errors';

export default (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return error instanceof HttpError
		? res.status(error.statusCode).send(error.payload())
		: next(error);
};
