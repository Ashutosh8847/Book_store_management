const Book = require('../models/booksModel')

const addbook = async (req, res) => {
    try {
        const { Booktitle, authorname, Bookdescription, publicationDate, imageurl, category, Bookpdfurl } = req.body
        // console.log("req.file", req.file)
        // const pdfurl = req.file.filename
        // console.log("pdfurl", pdfurl)
        const existingBook = await Book.findOne({ Booktitle })
        const newBook = new Book({
            Booktitle,
            authorname,
            Bookdescription,
            publicationDate,
            imageurl,
            category,
            Bookpdfurl,
            // pdfurl
        })
        if (existingBook) {
            res.status(422).json({ message: 'Book already exists' })
        }
        else if (newBook) {
            const savedBook = await newBook.save()
            res.status(200).json(savedBook)
        } else {
            res.status(422).json({ message: 'Invalid book data received' })
        }
    } catch (error) {
        console.error('Error in addbook controller:', error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getallbooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get books by their id
const getbookByID  = async(req,res) =>{
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (book){
            res.status(200).json(book)
        }else{
            res.status(400).json({ message: 'Invalid book data received' })
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })  
    }

}


const deleteBooks = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        if (id) {
            const deleteBook = await Book.findByIdAndDelete(id);
            res.status(200).json({ message: "Book deleted successfully with this", id })
        } else {
            res.status(400).json({ message: 'Invalid book data received' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updatebooks = async (req, res) => {
    try {
        const { Booktitle, authorname, Bookdescription, publicationDate, imageurl, category, Bookpdfurl, pdfurl } = req.body
        const id = req.params.id
        console.log("**id**", id)
        const updatedBooks = {}
        if (Booktitle) { updatedBooks.Booktitle = Booktitle }
        if (authorname) { updatedBooks.authorname = authorname }
        if (Bookdescription) { updatedBooks.Bookdescription = Bookdescription }
        if (publicationDate) { updatedBooks.publicationDate = publicationDate }
        if (imageurl) { updatedBooks.imageurl = imageurl }
        if (category) { updatedBooks.category = category }
        if (Bookpdfurl) { updatedBooks.Bookpdfurl = Bookpdfurl }
        if (pdfurl) { updatedBooks.pdfurl = pdfurl }

        let books = await Book.findById(id)
        if (books) {
            const updateBook = await Book.findByIdAndUpdate(id, updatedBooks, { new: true })
            res.status(200).json({ message: "Book updated successfully", updateBook })

        } else {
            res.status(400).json({ message: 'Invalid book data received' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const allbooks = async (req, res) => {
    try {
        let query = {};
        if (req.query.category) {
            query.category = req.query.category
        } else {
            const books = await Book.find(query)
            res.status(200).json(books)

        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    addbook,
    getallbooks,
    deleteBooks,
    updatebooks,
    allbooks,
    getbookByID
}