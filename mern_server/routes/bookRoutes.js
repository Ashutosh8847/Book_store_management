    const express = require('express')
    const book_route = express.Router();
    const multer = require('multer');
    const path = require('path')
    book_route.use(express.static('public'))
    // const auth = require('../middleware/auth')

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // Specify the destination directory for uploaded files
            cb(null, path.join(__dirname, '../public/bookUrl'), function (success, err) {
                if (err) {
                    console.log("error", err)
                }
            });
        },
        filename: function (req, file, cb) {
            // Specify how the file should be named
            const name = Date.now() + "-" + file.originalname

            cb(null, name, function (success, err) {
                if (err) {
                    console.log("***error***", err)
                }
            });
        },
    });
    // Create a Multer instance with the storage configuration
    const upload = multer({ storage: storage });

    const bookController = require('../controllers/bookController')
    // for add the book puprpose
    book_route.post('/addbook', upload.single('pdfurl'), bookController.addbook, (req,res)=>{
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);
    })

    // for get all books
    book_route.get('/getallbooks', bookController.getallbooks)
    // delete book
    book_route.delete('/deletebooks/:id', bookController.deleteBooks)
    // Update the books with the help of id:
    book_route.put('/updatebooks/:id', bookController.updatebooks)
    // get the book with category
    book_route.get('/getbook', bookController.allbooks)

    // get books by their id
    book_route.get('/getbookbyid/:id', bookController.getbookByID)





    module.exports = book_route;