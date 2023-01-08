const express = require('express');
const router = express.Router();

const {
	addToAll,
	addToCompleted,
	addToOnging,
	addToFavourites,
	getAll,
	getFavourites,
	getOngoing,
	getCompleted,
	deleteFromAll,
	deleteFromFavourites,
	deleteFromOngoing,
	deleteFromCompleted,
	findFromOngoing } = require('../controllers/controllers.js');


router.route('/').post(addToAll);   //done
router.route('/all').get(getAll);  // done
router.route('/favourites').get(getFavourites);   //done
router.route('/favourites/:id').delete(deleteFromFavourites); // done
router.route('/ongoing').get(getOngoing);  //done
router.route('/ongoing/:id').delete(deleteFromOngoing).patch(addToOnging);// done
router.route('/ongoing/:bookName').get(findFromOngoing);
router.route('/completed').get(getCompleted); //done
router.route('/completed/:id').delete(deleteFromCompleted).patch(addToCompleted);
router.route('/all/:id').delete(deleteFromAll).patch(addToFavourites);// done

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