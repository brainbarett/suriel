import express from 'express';
/** @ts-ignore */
import cors from 'cors';

const app = express();
app.use([express.json(), cors()]);

export { default as sequelize } from '@/services/sequelize';

import routes from '@/http/routes';
app.use(routes);

import httpErrorHandler from '@/http/middleware/http-error-handler';
app.use(httpErrorHandler);

export default app;
