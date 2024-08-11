import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookCard from './BookCard'
import Dashbord from './dashbod'

const AllBooks = () => {
  console.log("going to all books ")
  const navigate = useNavigate()
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4700/book/getallbooks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  },[books])

  return (
    <div>
      <Dashbord/>
      <BookCard books={books}/>
    </div>
  )
}

export default AllBooks
