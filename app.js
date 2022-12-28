const express = require('express');
const app = express();
require('dotenv').config();
const connectDB  = require('./DB/connect')
const routes = require('./routes/route');

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/home', routes);



const start = async() => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(5000, () => {
			console.log('server running on port 5000...');
		})
	} catch (error) {
		console.log(error);
	}
}

start();


