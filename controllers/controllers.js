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
        const books = await AllBooks.find({});
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// *  ADDING BOOK TO THE ALL DIRECTORY

const addToAll = async (req, res) => {
    try {
        const { name, authorName } = req.body;
        const books = await AllBooks.create({name,authorName});
        res.status(201).json({ books });
    } catch (error) {
        res.status(500).json({ error });
    }
};



// ! FAVOURITES DIRECTORY
// * GETTING ALL THE BOOKS IN FAVOURITE DIRECTORY
const getFavourites = async (req, res) => {
    try {
        const books = await Favourites.find({});
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const deleteFromFavourites = async (req,res) => {
    try {
        const { id: bookID } = req.params;
        const books = await Favourites.findOneAndDelete({ _id: bookID });
        if (!books) {
            return res.status(200).send(`No book with ID : ${bookID}`);
        }
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

// * ADDING BOOK TO THE FAVOURITES DIRECTORY
const addToFavourites = async (req, res) => {
    try {
        console.log(req.params);
        const { id: bookID } = req.params;
        const book = await AllBooks.findOne({ bookID });
        // console.log(book);
        const { name, authorName } = book;
        const books = await Favourites.create({ name: name, authorName: authorName });
        // console.log(books);
        res.status(201).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};



// ! ONGOING DIRECTORY

// * GETTING ALL THE BOOKS IN ONGOING DIRECTORY
const getOngoing = async (req, res) => {
    try {
        const books = await Ongoing.find({});
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


// * ADDING BOOK TO ONGOING DIRECTORY
const addToOnging = async (req, res) => {
    try {
        console.log(req.params);

        const { id: bookID } = req.params;
        console.log(bookID);
        const book = await AllBooks.findOne({ bookID });
        console.log(book);
        const { name, authorName } = book;
        console.log(name,authorName);
        const books = await Ongoing.create({  name,  authorName });
        res.status(200).json({ books });
        
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}


// * FIND FROM ONGOING

const findFromOngoing = async (req, res) => {
    try {
        const { id: bookName } = req.params;
        console.log(`id of Ongoing ${bookName}`);
        const books = await Ongoing.find({ bookName });
        console.log(books);
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}


// * DELETING FROM ONGOING DIRECTORY

const deleteFromOngoing = async (req, res) => {
    try {
        const { id: bookID } = req.params;
        const books=await Ongoing.findOneAndDelete({ bookID });
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}



// ! COMPLETED DIRECTORY
// * ADD BOOKS TO COMPLETED.
const addToCompleted = async (req,res) => {
    try {
        const books = await Completed.create(req.body);
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
    
}

// * GETTING ALL THE BOOKS IN COMPLETED DIRECTORY
const getCompleted = async (req, res) => {
    try {
        const books = await Completed.find({});
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


// * DELETING BOOK FROM COMPLETED.

const deleteFromCompleted = async (req, res) => {
    try {
        const { id: bookID } = req.params;
        const books = await Completed.findOneAndDelete({ bookID });
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
} 

// * DELETING A BOOK FROM ALL DIRECTORY

const deleteFromAll = async (req, res) => {
    try {
        const { id: bookID } = req.params;
        const book = await AllBooks.findOne({ bookID });
        const { name } = book;
        await Favourites.findOneAndDelete({ name });
        await Ongoing.findOneAndDelete({ name });
        await Completed.findOneAndDelete({ name });
        const books = await AllBooks.findOneAndDelete({ _id: bookID });
        if (!books) {
            return res.status(200).send(`No book with ID : ${bookID}`);
        }
        res.status(200).json({ books });
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
