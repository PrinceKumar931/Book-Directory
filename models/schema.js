const mongoose = require('mongoose');


// * Schema for All Books Directory
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
	},
	favourites: {
		type: Boolean,
		default: false
	}
},{timestamps:true});

// * Schema for Ongoing Books Directory
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
	},{timestamps:true,})


// * Schema for Completed Books Directory
const CompletedBooksSchema =new mongoose.Schema({

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

}, { timestamps: true })


// * Schema for Favourites Books Directory
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


// ! Favourites -> cannot add more than one boook and if somehow it happens then all with same name. fix it
// ! Favourites -> change the heart to regular after being deleted from favourites.