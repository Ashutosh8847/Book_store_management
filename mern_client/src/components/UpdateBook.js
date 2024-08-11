import React, { useEffect } from 'react'
import Dashbord from './dashbod'
import { useState } from 'react'
import Book4 from './image/Book6.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
const UpdateBook = () => {
  const navigate = useNavigate()
  const params = useParams()

  const id = params.id
  console.log(id)
  console.log("gouing to update book")
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:4700/book/getbookbyid/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()
        // Format the publicationDate to "yyyy-MM-dd"
        const formattedDate = new Date(data.publicationDate).toISOString().split('T')[0];

        console.log("data", data)
        setBooks({...data, publicationDate:formattedDate})

      } catch (error) {
        console.log(error)

      }
    };
    fetchData()
  }, [id])



  const handleChangeSelectBookCategories = (event) => {
    console.log(event.target.value)
    const booksCategory = event.target.value || "General";
    setSelectBookCategories(booksCategory)
    setBooks((prevBooks) => ({
      ...prevBooks,
      category: booksCategory

    }))
  }

const updateBookHandler = async(e) =>{
  e.preventDefault()
  console.log("going to update book handler")
  console.log("books",books)

  try {
    const res = await fetch(`http://localhost:4700/book/updatebooks/${id}`, {
      method:"PUT",
      headers:{
        'content-Type':"application/json"
      },
      body:JSON.stringify(books) 
    })
    const data = await res.json()
    console.log("data",data)

    if(res.ok){
      // window.alert("book updated successfully")
      toast.success("Book updated successfully")
      navigate("/dashbord/AllBooks")
    }else{
      // window.alert("something went wrong")
      toast.error("something went wrong")
    }
    
  } catch (error) {
    console.log(error)  
  }
}



  return (
    <div>
      <Dashbord />
      <div className='book' id="book" style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "30%" }}>

        <form onSubmit={updateBookHandler} method="POST" style={{ width: "500px", margin: "0 auto", fontFamily: "red serifs" }}>
          <div style={{ paddingTop: "10px" }}>
          </div>
          <h2 style={{ textAlign: "center", color: "Black", fontFamily: "red serifs ", paddingTop: "25px", fontWeight: "bolder" }}>Update Book</h2>
          <label htmlFor="Booktitle" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Book Title:</label>
          <input type="text" id="Booktitle" name="Booktitle" required
            defaultValue={books.Booktitle}
            onChange={(e) => setBooks({ ...books, Booktitle: e.target.value })}
          />


          <label htmlFor="authorname" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Author Name:</label>
          <input type="text" id="authorname" name="authorname" required
            defaultValue={books.authorname}
            onChange={(e) => setBooks({ ...books, authorname: e.target.value })}

          />


          <label htmlFor="Bookdescription" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Book Description:</label>
          <textarea id="Bookdescription" name="Bookdescription" required style={{ height: "56px", width: "500px" }}
            defaultValue={books.Bookdescription}
            onChange={(e) => setBooks({ ...books, Bookdescription: e.target.value })}

          ></textarea>


          <label htmlFor="publicationDate" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Publication Date:</label>
          <input type="date" id="publicationDate" name="publicationDate" required
            defaultValue={books.publicationDate}
            onChange={(e) => setBooks({ ...books, publicationDate: e.target.value })}

          />


          <label htmlFor="imageurl" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Image URL:</label>
          <input type="text" id="imageurl" name="imageurl" required
            defaultValue={books.imageurl}
            onChange={(e) => setBooks({ ...books, imageurl: e.target.value })}

          />

          <div>
            <label htmlFor="category" style={{ fontFamily: "red serifs ", fontWeight: "bold" }}>Category:</label>
            <select id="inputState" name="category" value={books.category} style={{ width: "500px", fontFamily: "red serifs ", height: "30px" }} required
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
            defaultValue={books.Bookpdfurl}
            onChange={(e) => setBooks({ ...books, Bookpdfurl: e.target.value })}
          />


          <div className="button-container">
            <button type="submit" style={{ textAlign: "center", backgroundColor: "blue", fontFamily: "red serifs" }}>Update</button>
          </div>

          {/* <button type="submit">Submit</button> */}
        </form>
        <img src={Book4} style={{ width: "40%", height: "40%", paddingTop: "60px", }}></img>
      </div>

    </div>
  )
}

export default UpdateBook
