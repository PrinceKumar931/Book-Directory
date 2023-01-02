const mongoose = require('mongoose');

const BookDirectorySchema =new mongoose.Schema({
// Do add Created_at and updated_at flags for your reference
//Also it helps to add an ID column as well but not mandatory
	name: {
		type: String,
		required: [true, 'must provide name of the book'],
		trim: true,
		maxlength:[40,'name cannot be more than 40 characters']
	},
	authorName: {
		type: String,
		required: true,
		trim: true
	},
})


const AllBooks = mongoose.model('AllBooks', BookDirectorySchema);
const Favourites = mongoose.model('Favourites', BookDirectorySchema);
const Completed = mongoose.model('Completed', BookDirectorySchema);
const Ongoing = mongoose.model('Ongoing', BookDirectorySchema);

module.exports = {
	AllBooks,
	Favourites,
	Ongoing,
	Completed,
}