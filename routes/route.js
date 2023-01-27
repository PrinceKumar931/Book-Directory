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
	} = require('../controllers/controllers.js');


router.route('/').post(addToAll);  
router.route('/all').get(getAll);  
router.route('/favourites').get(getFavourites);   
router.route('/favourites/:id/:bookName').delete(deleteFromFavourites); 
router.route('/ongoing').get(getOngoing);  
router.route('/ongoing/:id').delete(deleteFromOngoing).patch(addToOnging);
router.route('/completed').get(getCompleted); 
router.route('/completed/:id').delete(deleteFromCompleted).patch(addToCompleted);
router.route('/all/:id').delete(deleteFromAll);
router.route('/all/:id/:favStatus').patch(addToFavourites);


module.exports = router;