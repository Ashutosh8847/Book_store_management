const mongoose = require('mongoose')
const {Schema} = mongoose;

const bookSchema = new Schema({
    Booktitle: {
        type: String,
        required: true,
    },
    authorname: {
        type: String,
        required: true,
    },
    Bookdescription: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    imageurl:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    Bookpdfurl:{
        type: String,
        required: true
       
    },
    // pdfurl:{
    //     type: String,
    //     default: null,
       
    // }
},
{timestamps:true}
);

const Book = mongoose.model('Book', bookSchema);
Book.createIndexes()
module.exports = Book;
