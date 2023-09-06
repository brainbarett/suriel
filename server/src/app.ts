import express from 'express';

const app = express();
app.use(express.json());

export { default as sequelize } from '@/services/sequelize';

import httpErrorHandler from '@/http/middleware/http-error-handler';
app.get('/', (req, res) => {
	return res.send('hello');
});
app.use(httpErrorHandler);

export default app;
