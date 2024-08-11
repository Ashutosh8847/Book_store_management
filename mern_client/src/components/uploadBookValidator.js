export const uploadBookvalidation = ({ books }) => {
    const error = {}

    

    if (books.Booktitle === "") {
        error.Booktitle = "*Book title is required"
    }
    if (books.authorname === "") {
        error.authorname = "*authorname is required"
    }

    if (books.Bookdescription === "") {
        error.Bookdescription = "*Book description is required"
    }

    if (books.imageurl === "") {
        error.imageurl = "*Image url is required"
    }

    if (books.category === "") {
        error.category = "*Book category Password is required"
    } 

    if (books.Bookpdfurl === "") {
        error.Bookpdfurl = "*Pdf url is required"
    }

    if (books.publicationDate === "") {
        error.publicationDate = "*Publication date is required"
    }
    return error;

}