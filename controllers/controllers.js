const {
    AllBooks,
    Favourites,
    Ongoing,
    Completed
} = require("../models/schema");



// * GETTING ALL THE BOOKS IN THE DIRECTORY
const getAll = async (req, res) => {
    try {
        const books = await AllBooks.find({});
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// *  ADDING BOOK TO THE ALL DIRECTORY

const addToAll = async (req, res) => {
    try {
        const book = await AllBooks.create(req.body);
        res.status(201).json({ book });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// * ADDING BOOK TO THE FAVOURITES DIRECTORY
const addToFavourites = async (req, res) => {
    try {
        const book = await Favourites.create(req.body);
        res.status(201).json({ book });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// * GETTING ALL THE BOOKS IN FAVOURITE DIRECTORY
const getFavourites = async (req, res) => {
    try {
        const books = await Favourites.find({});
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// * GETTING ALL THE BOOKS IN ONGOING DIRECTORY
const getOngoing = async (req, res) => {
    try {
        const books = await Ongoing.find({});
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// * GETTING ALL THE BOOKS IN COMPLETED DIRECTORY
const getCompleted = async (req, res) => {
    try {
        const books = await Completed.find({});
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// * DELETING A BOOK FROM ALL DIRECTORY

const deleteFromAll = async (req, res) => {
    try {
        const { id: bookID } = req.params;
        const book = await AllBooks.findOneAndDelete({ _id: bookID });
        if (!book) {
            return res.status(200).send(`No book with ID : ${bookID}`);
        }
        res.status(200).json({ book });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    addToAll,
    addToFavourites,
    getAll,
    getFavourites,
    getOngoing,
    getCompleted,
    deleteFromAll
};
