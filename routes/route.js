const express = require('express');
const router = express.Router();

const {
	addToAll,
	addToFavourites,
	getAll,
	getFavourites,
	getOngoing,
	getCompleted,
	deleteFromAll } = require('../controllers/controllers.js')


router.route('/').get(getAll).post(addToAll).patch(addToFavourites);
router.route('/favourites').get(getFavourites);
router.route('/ongoing').get(getOngoing);
router.route('/completed').get(getCompleted);
router.route('/:id').delete(deleteFromAll);
// router.route('/home/').get(getFavourites).get(getOngoing).get(getCompleted);

// app.get('/api/v1/home', (req, res) => {
// 	res.send('home')
// })
// app.get('/api/v1/home/allbooks', (req, res) => {
// 	res.send('all Books')
// })
// app.get('/api/v1/home/favourites', (req, res) => {
// 	res.send('favourites')
// })
// app.get('/api/v1/home/ongoing', (req, res) => {
// 	res.send('ongoing')
// })
// app.get('/api/v1/home/completed', (req, res) => {
// 	res.send('completed')
// })

module.exports = router;