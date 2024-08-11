import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import NavImg from "./image/nav2.png"

const Navbar = () => {
    const navigate = useNavigate();
    const isDashboardRoute = window.location.pathname === '/dashbord';
    const isDashboardRoute1 = window.location.pathname === '/dashbord/UploadBooks';
    const isDashboardRoute2 = window.location.pathname === '/dashbord/AllBooks';
    // Hide Navbar when on "/dashboard"
    if (isDashboardRoute || isDashboardRoute1 || isDashboardRoute2) {
        return null;
    }
    return (
        <div className='navbar-container' style={{ position: "fixed", width: "100%", }}>
            <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "transparent" }}>
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/login" style={{ color: "blue", fontFamily: "cursive", fontWeight: "bold" }}>
                        BOOK LIBRARY
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" style={{ color: "black", fontFamily: "cursive", fontWeight: "bold", fontSize: "17px"}} to="#">Home</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item" >
                                <Link style={{ color: "black", fontFamily: "cursive", fontWeight: "bold", fontSize: "17px" }} className="nav-link" to="/signup">sign up</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item" >
                                <Link style={{ color: "black", fontFamily: "cursive", fontWeight: "bold", fontSize: "17px" }} className="nav-link" to="/login">Log in</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
