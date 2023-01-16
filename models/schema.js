const mongoose = require('mongoose');



const AllBooksSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide name of the book'],
		trim: true,
		maxlength: [50, 'name cannot be more than 50 characters'],
		unique: true
	},
	authorName: {
		type: String,
		required: true,
		trim: true
	},
	readingStatus: {
		type: Number,
		default: false 
		// 0 -> Start Reading
		// 1 -> Ongoing
		// 2 -> Completed
	}
},{timestamps:true});


const OngoingBooksSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'must provide name of the book'],
			trim: true,
			maxlength: [40, 'name cannot be more than 40 characters'],
			unique: true
		},
		authorName: {
			type: String,
			required: true,
			trim: true
		},
		targetDate: {
			type: Date,
			default: null
		}
	},{timestamps:true,})

const CompletedBooksSchema =new mongoose.Schema({
// Do add Created_at and updated_at flags for your reference
//Also it helps to add an ID column as well but not mandatory
	name: {
		type: String,
		required: [true, 'must provide name of the book'],
		trim: true,
		maxlength: [40, 'name cannot be more than 40 characters'],
		unique:true
	},
	authorName: {
		type: String,
		required: true,
		trim: true
	},

},{timestamps:true})

const FavouriteBooksSchema = new mongoose.Schema({
	// Do add Created_at and updated_at flags for your reference
	//Also it helps to add an ID column as well but not mandatory
	name: {
		type: String,
		required: [true, 'must provide name of the book'],
		trim: true,
		maxlength: [40, 'name cannot be more than 40 characters'],
		unique: true
	},
	authorName: {
		type: String,
		required: true,
		trim: true
	},

},{timestamps:true})


const AllBooks = mongoose.model('AllBooks', AllBooksSchema);
const Favourites = mongoose.model('Favourites', FavouriteBooksSchema);
const Completed = mongoose.model('Completed', CompletedBooksSchema);
const Ongoing = mongoose.model('Ongoing', OngoingBooksSchema);

module.exports = {
	AllBooks,
	Favourites,
	Ongoing,
	Completed,
}