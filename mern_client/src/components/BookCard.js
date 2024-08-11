import React from 'react'
import { Link } from 'react-router-dom'
import UpdateBook from './UpdateBook'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const BookCard = ({ books }) => {
    console.log("going to all books ", books)
    const navigate = useNavigate()

    const deleteBookHandler = async (id) => {
        console.log("going to delete book handler")
        // const id = req.params.id
        // console.log("***id***",id)

        const response = await fetch(`http://localhost:4700/book/deletebooks/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        console.log("data", data)

        try {
            if(response.ok){
                // alert("Deleted successfully")
                toast.success("Book Deleted successfully")
            }else{
                // alert("some thing went wrong")
                toast.error("Something went wrong")
            }
            
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
            
        }
        
    }

    return (
        <div className='book-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            <h2 style={{ textAlign: "center",paddingLeft:" 243px", fontFamily: "red serif", fontWeight: "bold",color: "blue" }}>All Books</h2>

            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: "258px",paddingRight:"22px", }}>
                {books.map((book) => (
                    <div key={book._id} className="card" style={{ width: '14rem', margin: '10px' }}>
                        <img style={{ height: "250px" }} src={book.imageurl} className="card-img-top" alt={book.Booktitle} />
                        <div className="card-body" style={{ textAlign: "center", backgroundColor:"black", paddingTop:"0px" }}>
                            <h5 className="card-title" style={{ textAlign: "center", fontFamily:"red serif", color:"white" }}>{book.Booktitle}</h5>
                            <p style={{ textAlign: "center", fontSize:"15px", fontFamily:"red serif",color:"white"}}>BY:-{book.authorname} </p>
                            <p style={{ textAlign: "center", fontSize:"15px", fontFamily:"red serif",marginTop:"-21px", color:"white"}}>Category:-{book.category}</p>
        
                            <div style={{display:"flex",justifyContent:"space-between", paddingTop:"0px"}}>
                                <Link to={`/dashbord/update-books/${book._id}`}>
                                <FaEdit  style={{fontSize:"20px", color:"white"}}/>
                                </Link>
                           
                            <Link to={book.Bookpdfurl} target='_blank'>
                            <FaPlayCircle style={{fontSize:"20px", color:"white"}}/>
                            </Link>   
                            {/* <Link to={`/dashbord/delete-books/${book._id}`}><MdDelete style={{fontSize:"20px", color:"white"}} /></Link>    */}
                            <MdDelete onClick={()=> deleteBookHandler(book._id)} style={{fontSize:"20px", color:"white"}} />
                            
                            </div>      
                        </div>
                        
                    </div>

                ))}

            </div>

        </div>
    )
}

export default BookCard
