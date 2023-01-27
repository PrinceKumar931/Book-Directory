const express = require('express');
const app = express();
require('dotenv').config();
const connectDB  = require('./DB/connect')
const routes = require('./routes/route');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/home', routes);

app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async() => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => {
			console.log(`server running on port ${process.env.PORT}...`);
		})
	} catch (error) {
		console.log(error);
	}
}

start();


