import express from 'express';

const app = express();
app.use(express.json());

export { default as sequelize } from '@/services/sequelize';

import routes from '@/http/routes';
app.use(routes);

import httpErrorHandler from '@/http/middleware/http-error-handler';
app.use(httpErrorHandler);

export default app;
