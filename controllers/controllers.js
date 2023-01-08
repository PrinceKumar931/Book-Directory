const mongoose = require('mongoose');
const {
    AllBooks,
    Favourites,
    Ongoing,
    Completed
} = require("../models/schema");


// !ALL DIRECTORY
// * GETTING ALL THE BOOKS IN THE DIRECTORY
const getAll = async (req, res) => {
    try {
        console.log('----------Getting All Books----------');
        const books = await AllBooks.find({});
        res.status(200).json({ books });
        console.log('----------Got All Books--------------');
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// *  ADDING BOOK TO THE ALL DIRECTORY

const addToAll = async (req, res) => {
    try {
        console.log('---------addition in process----------');
        const { name, authorName } = req.body;
        const books = await AllBooks.create({name,authorName});
        res.status(201).json({ books });
        console.log('------------addition done-------------');
    } catch (error) {
        res.status(500).json({ error });
    }
};



// ! FAVOURITES DIRECTORY
// * GETTING ALL THE BOOKS IN FAVOURITE DIRECTORY
const getFavourites = async (req, res) => {
    try {
        
        console.log('-------------getting favourites------------');
        const books = await Favourites.find({});
        res.status(200).json({ books });
        console.log('-------------got favourites------------');
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const deleteFromFavourites = async (req,res) => {
    try {
        console.log('------------Deleting From Favourites-------------');
        const { id: bookID } = req.params;
        const books = await Favourites.findOneAndDelete({ _id: bookID });
        if (!books) {
            return res.status(200).send(`No book with ID : ${bookID}`);
        }
        res.status(200).json({ books });
        console.log('------------Deleted From Favourites-------------');
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

// * ADDING BOOK TO THE FAVOURITES DIRECTORY
const addToFavourites = async (req, res) => {
    try {

        console.log('------------Adding To Favourites---------------');
        console.log(req.params);
        const { id: bookID } = req.params;
        const book = await AllBooks.findOne({ bookID });
        const { name, authorName } = book;
        const books = await Favourites.create({ name, authorName });
        console.log('------------Added To Favourites---------------');
        res.status(201).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};



// ! ONGOING DIRECTORY

// * GETTING ALL THE BOOKS IN ONGOING DIRECTORY
const getOngoing = async (req, res) => {
    try {
        console.log('-----------Getting Ongoing Books-----------');
        const books = await Ongoing.find({});
        res.status(200).json({ books });
        console.log('-----------Got Ongoing Books-----------');
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


// * ADDING BOOK TO ONGOING DIRECTORY
const addToOnging = async (req, res) => {
    try {
        console.log('----------Adding to Ongoing----------');
        const { id: bookID } = req.params;
        console.log(bookID);
        const book = await AllBooks.findByIdAndUpdate(bookID, { readingStatus: 1 });
        console.log(book);
        const { name, authorName } = book;
        const books = await Ongoing.create({  name,  authorName });
        res.status(200).json({ books });
        console.log('-----------Added to Ongoing----------');
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}


// * FIND FROM ONGOING

const findFromOngoing = async (req, res) => {
    try {
        console.log('-----------finding from ongoing----------');
        const { bookName } = req.params;
        console.log(bookName);
        const books = await Ongoing.find({ bookName });
        console.log(books);
        res.status(200).json({ books });
        console.log('------------Found From Ongoing-----------');
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}


// * DELETING FROM ONGOING DIRECTORY

const deleteFromOngoing = async (req, res) => {
    try {

        console.log('-----------Deleting From Ongoing----------------');
        const { id: bookID } = req.params;
        console.log(bookID);
        const { name }= await Ongoing.findById({ _id: bookID });
        console.log(name);
        const updated = await AllBooks.findOneAndUpdate({ name }, { readingStatus: 0 });
        const books = await Ongoing.findOneAndDelete({ bookID });
        console.log(updated);
        res.status(200).json({ books });
        console.log('-------------Deleted------------------');
        
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}



// ! COMPLETED DIRECTORY
// * ADD BOOKS TO COMPLETED.
const addToCompleted = async (req,res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ msg: error });
    }
    
}

// * GETTING ALL THE BOOKS IN COMPLETED DIRECTORY
const getCompleted = async (req, res) => {
    try {
        console.log('------------Getting Books From Completed-------------');
        const books = await Completed.find({});
        res.status(200).json({ books });
        console.log('------------Got Books From Completed-------------');
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


// * DELETING BOOK FROM COMPLETED.

const deleteFromCompleted = async (req, res) => {
    try {
        console.log('------------Deleting Books From Completed-------------');
        const { id: bookID } = req.params;
        const books = await Completed.findOneAndDelete({ bookID });
        res.status(200).json({ books });
        console.log('------------Deleted Books From Completed-------------');
    } catch (error) {
        res.status(500).json({ msg: error });
    }
} 

// * DELETING A BOOK FROM ALL DIRECTORY

const deleteFromAll = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};




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
    findFromOngoing
};
