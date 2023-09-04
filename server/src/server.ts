import dotenv from 'dotenv';
dotenv.config();

import process from 'process';
import app from './app';

const port = process.env.SERVER_PORT;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
