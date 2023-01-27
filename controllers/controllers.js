const asyncWrapper = require('../middleware/async');

const {
    AllBooks,
    Favourites,
    Ongoing,
    Completed
} = require("../models/schema");


// ! ALL DIRECTORY
// * GETTING ALL THE BOOKS IN THE ALL BOOKS DIRECTORY
const getAll = asyncWrapper(async (req, res) => {

    console.log('----------Getting All Books----------');

    const books = await AllBooks.find({});
    res.status(200).json({ books });

    console.log('----------Got All Books--------------');

});

// *  ADDING BOOK TO THE ALL DIRECTORY

const addToAll = asyncWrapper(async (req, res) => {
    
    console.log('---------addition in process----------');

    const { name, authorName } = req.body;
    const books = await AllBooks.create({ name, authorName });
    res.status(201).json({ books });

    console.log('------------addition done-------------');
});



// ! FAVOURITES DIRECTORY
// * GETTING ALL THE BOOKS IN FAVOURITE DIRECTORY
const getFavourites = asyncWrapper(async (req, res) => {

    console.log('-------------getting favourites------------');

    const books = await Favourites.find({});
    res.status(200).json({ books });

    console.log('-------------got favourites------------');

});

const deleteFromFavourites = asyncWrapper(async (req, res) => {

    console.log('------------Deleting From Favourites-------------');

    const { id: bookID, bookName:name } = req.params;
    console.log(name);
    const books = await Favourites.findOneAndDelete({ _id: bookID });
    if (!books) {
        return res.status(200).send(`No book with ID : ${bookID}`);
    }
    await AllBooks.findOneAndUpdate(name , { favourites: false });
    res.status(200).json({ books });

    console.log('------------Deleted From Favourites-------------');
    
});

// * ADDING BOOK TO THE FAVOURITES DIRECTORY
const addToFavourites = asyncWrapper(async (req, res) => {

    console.log('------------Adding To Favourites---------------');

    console.log(req.params);
    const { id: bookID } = req.params;
    console.log(bookID);
    const book = await AllBooks.findById(bookID);
    const { name, authorName } = book;
    console.log(`Book Name ---> ${name} AuthorName---> ${authorName}`);
    const books = await Favourites.create({ name, authorName });
    await AllBooks.findByIdAndUpdate(bookID, { favourites: true });
    res.status(201).json({ books });

    console.log('------------Added To Favourites---------------');
});



// ! ONGOING DIRECTORY

// * GETTING ALL THE BOOKS IN ONGOING DIRECTORY
const getOngoing = asyncWrapper(async (req, res) => {

    console.log('-----------Getting Ongoing Books-----------');

    const books = await Ongoing.find({});
    res.status(200).json({ books });

    console.log('-----------Got Ongoing Books-----------');

})


// * ADDING BOOK TO ONGOING DIRECTORY
const addToOnging = asyncWrapper(async (req, res) => {

    console.log('----------Adding to Ongoing----------');

    const { id: bookID } = req.params;
    console.log(bookID);
    const book = await AllBooks.findByIdAndUpdate(bookID, { readingStatus: 1 });
    console.log(book);
    const { name, authorName } = book;
    const books = await Ongoing.create({ name, authorName });
    res.status(200).json({ books });

    console.log('-----------Added to Ongoing----------');
});


// * DELETING FROM ONGOING DIRECTORY

const deleteFromOngoing = asyncWrapper(async (req, res) => {

    console.log('-----------Deleting From Ongoing----------------');

    const { id: bookID } = req.params;
    console.log(bookID);
    const { name } = await Ongoing.findById({ _id: bookID });
    console.log(name);
    const updated = await AllBooks.findOneAndUpdate({ name }, { readingStatus: 0 });
    const books = await Ongoing.findOneAndDelete({ bookID });
    console.log(updated);
    res.status(200).json({ books });

    console.log('-------------Deleted------------------');

});



// ! COMPLETED DIRECTORY
// * ADD BOOKS TO COMPLETED.
const addToCompleted = asyncWrapper(async (req, res) => {

    console.log('------------Adding To Completed-------------');
    
    const { id: bookID } = req.params;
    console.log(bookID);
    const { name, authorName } = await Ongoing.findById(bookID);
    console.log(`${name} <------> ${authorName}`);
    const books = await Completed.create({ name, authorName });
    await Ongoing.findOneAndDelete({ name });
    await AllBooks.findOneAndUpdate({ name }, { readingStatus: 2 });
    res.status(200).json({ books });

    console.log('------------Added To Completed-------------');

});

// * GETTING ALL THE BOOKS IN COMPLETED DIRECTORY
const getCompleted = asyncWrapper(async (req, res) => {

    console.log('------------Getting Books From Completed-------------');

    const books = await Completed.find({});
    res.status(200).json({ books });

    console.log('------------Got Books From Completed-------------');
});


// * DELETING BOOK FROM COMPLETED.

const deleteFromCompleted = asyncWrapper(async (req, res) => {

    console.log('------------Deleting Books From Completed-------------');

    const { id: bookID } = req.params;
    const books = await Completed.findOneAndDelete({ bookID });
    res.status(200).json({ books });

    console.log('------------Deleted Books From Completed-------------');

});

// * DELETING A BOOK FROM ALL DIRECTORY

const deleteFromAll = asyncWrapper(async (req, res) => {

    console.log('--------------Deleting From All Books----------------');

    const { id: bookID } = req.params;
    const book = await AllBooks.findById(bookID);
    const { name } = book;
    await Favourites.findOneAndDelete({ name });
    await Ongoing.findOneAndDelete({ name });
    await Completed.findOneAndDelete({ name });
    const books = await AllBooks.findOneAndDelete({ _id: bookID });
    if (!books) {
        return res.status(200).send(`No book with ID : ${bookID}`);
    }
    res.status(200).json({ books });
    
    console.log('--------------Deleting From All Books----------------');

});


module.exports = {
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
};
