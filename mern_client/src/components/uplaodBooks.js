import React from 'react'
import { Link } from 'react-router-dom'
import Dashbord from './dashbod';
import { useState } from 'react';
import { uploadBookvalidation } from './uploadBookValidator';
import { useEffect } from 'react';
import Book4 from './image/Book4.png'

const UploadBooks = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery/Thriller",
    "History",
    "Religion",
    "Spirituality",
    "Biography",
    "Autobiography",
    "Self-Help/Motivation",
    "Business/Finance",
    "Science",
    "Fantasy",
    "Romance",
    "Children's",
    "Poetry",
    "Cookbooks",
    "Art",
    "Photography",
    "Travel",
    "Humor",
    "Education",
    "Reference",
    "Graphic",
    "Novels",
    "Comics",
    "Technology",
    "General"
  ]

  const [selectBookCategories, setSelectBookCategories] = useState(bookCategories[0])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  // State to track the selected file
  // const [file, setFile] = useState(null);

  const [books, setBooks] = useState({
    Booktitle: "",
    authorname: "",
    Bookdescription: "",
    imageurl: "",
    category: selectBookCategories,
    Bookpdfurl: "",
    pdfurl: "",
    publicationDate: ""
  })


  const [error, setError] = useState({})

  let name, value
  const handleChange = async (e) => {
    e.preventDefault()
    console.log(e)
    name = e.target.name
    value = e.target.value
    setBooks({ ...books, [name]: value });

    setError((error) => ({ ...error, [name]: "" }))
  }

  // const handleFileChange = async (e) => {
  //   const selectedFile = e.target.files[0]
  //   setFile(selectedFile);
  //   setBooks((prevBooks) => ({
  //     ...prevBooks,
  //     pdfurl: selectedFile.name,  // Assuming you want to set the file name as pdfurl
  //   }));
  //   console.log("*************", selectedFile);
  // }



  const handleChangeSelectBookCategories = (event) => {
    console.log(event.target.value)
    const booksCategory = event.target.value || "General";
    setSelectBookCategories(booksCategory)
    setBooks((prevBooks) => ({
      ...prevBooks,
      category: booksCategory

    }))

  }

  const uploadBookHandler = async (e) => {
    e.preventDefault()
    console.log("Uploading handler hit")
    console.log("books",books)
    // Create a FormData object to send both file and other form data
    // const formData = new FormData();
    // formData.append("pdfurl", file);
  
    // for (const key in books) {
    //   formData.append(key, books[key]);
    // }
    //   console.log("Request payload:", formData);


    

    const uploadBooksvalidator = uploadBookvalidation({ books });
    // Update the error state with the validation errors, if any
    // If there are validation errors, return early
    if (uploadBooksvalidator && Object.keys(uploadBooksvalidator).length > 0) {
      setError(uploadBooksvalidator)
      return;
    }

    try {
      const { Booktitle, authorname, Bookdescription, imageurl, category, Bookpdfurl, pdfurl, publicationDate } = books

      const res = await fetch(`http://localhost:4700/book/addbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      
        },
        body: JSON.stringify({ Booktitle, authorname, Bookdescription, imageurl, category, Bookpdfurl, pdfurl, publicationDate })
      })
      console.log("body",res)

      const data = await res.json()
      console.log(data)

      if (res.status === 422 && data.message.includes("Book already exists")) {
        setError({ Booktitle: "Book already exists" })
      }
      else if (res.status === 422 && data.message.includes("Invalid book data received")) {
        setError({ Booktitle: "Invalid book data received" })
      }
      else if (res.status === 500 && data.message.includes("Something went wrong")) {
        setError({ Booktitle: "Something went wrong" })
      }
      else if (res.ok) {
        setShowSuccessMessage(true)
        setBooks({
          Booktitle: "",
          authorname: "",
          Bookdescription: "",
          imageurl: "",
          category: "",
          Bookpdfurl: "",
          pdfurl: "",
          publicationDate: ""
        });
        // window.alert("Book uploaded successfully")

      }
      else if (res.status === 422 || !data) {
        setError({ Booktitle: "Invalid book data received" })
      }
      else if (res.status === 500 || !data) {
        setError({ Booktitle: "Something went wrong" })
      }

      else {
        setShowSuccessMessage(true)
        // window.alert("Book uploaded successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)

      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showSuccessMessage])

  return (

    <div>
      <Dashbord />
      <div className='book' id="book" style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "30%" }}>

        <form method="POST" style={{ width: "500px", margin: "0 auto", fontFamily: "red serifs" }}>
          <div style={{ paddingTop: "10px" }}>
            {showSuccessMessage && <div style={{ color: "white", backgroundColor: "green", padding: "8px", textAlign: "center", width: "60%", marginLeft: "120%", borderRadius: "5px", paddingTop: "10px" }}>Book uploaded successfully</div>}
          </div>
          <h2 style={{ textAlign: "center", color: "blue", fontFamily: "red serifs ", paddingTop: "25px" }}>Upload Books</h2>
          <label htmlFor="Booktitle" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Book Title:</label>
          <input type="text" id="Booktitle" name="Booktitle" required
            onChange={handleChange}
            value={books.Booktitle}

          />
          {error.Booktitle && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.Booktitle}</p>}


          <label htmlFor="authorname" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Author Name:</label>
          <input type="text" id="authorname" name="authorname" required
            onChange={handleChange}
            value={books.authorname}
          />
          {error.authorname && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.authorname}</p>}


          <label htmlFor="Bookdescription" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Book Description:</label>
          <textarea id="Bookdescription" name="Bookdescription" required style={{ height: "56px", width: "500px" }}
            onChange={handleChange}
            value={books.Bookdescription}

          ></textarea>
          {error.Bookdescription && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.Bookdescription}</p>}


          <label htmlFor="publicationDate" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Publication Date:</label>
          <input type="date" id="publicationDate" name="publicationDate" required
            onChange={handleChange}
            value={books.publicationDate}

          />
          {error.publicationDate && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.publicationDate}</p>}


          <label htmlFor="imageurl" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Image URL:</label>
          <input type="text" id="imageurl" name="imageurl" required
            onChange={handleChange}
            value={books.imageurl}

          />
          {error.imageurl && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.imageurl}</p>}

          <div>
            <label htmlFor="category" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Category:</label>
            <select id="inputState" name="category" value={selectBookCategories} style={{ width: "500px", fontFamily: "red serifs ", height: "30px" }} required
              onChange={handleChangeSelectBookCategories}>
              {
                bookCategories.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))

              }
            </select>
          </div>
          <label htmlFor="Bookpdfurl" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Book PDF URL:</label>
          <input type="text" id="Bookpdfurl" name="Bookpdfurl" required
            onChange={handleChange}
            value={books.Bookpdfurl} />
          {error.Bookpdfurl && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.Bookpdfurl}</p>}


          {/* <label htmlFor="pdfurl" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>PDF URL:</label>
          <input type="file" id="pdfurl" name="pdfurl" onChange={handleChange} required
            values={books.pdfurl} /> */}



          <div className="button-container">
            <button type="submit" style={{ textAlign: "center", backgroundColor: "blue", fontFamily: "red serifs" }} onClick={uploadBookHandler} >Submit</button>
          </div>

          {/* <button type="submit">Submit</button> */}
        </form>
        <img src={Book4} style={{ width: "40%", height: "40%" }}></img>
      </div>
    </div>
  )
}

export default UploadBooks;
