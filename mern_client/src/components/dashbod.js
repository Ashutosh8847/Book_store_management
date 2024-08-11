import React from 'react';
import './dashbord.css';
import { Link } from 'react-router-dom'
// import UploadBooks from './uplaodBooks';

const Dashbord = () => {
    return (
        <div>
            <aside className="sidebar">
                <div className="logo">
                    <h2>Book Library</h2>
                </div>
                <ul className="links">
                    <h4>Main Menu</h4>
                    <li>
                        <span className="material-symbols-outlined">dashboard</span>
                        <Link to="/dashbord/AllBooks">All Books</Link>
                    </li>
                    <li>
                        <span className="material-symbols-outlined">upload</span>
                        <Link to="/dashbord/UploadBooks">Upload Book</Link>
                    </li>
                    <hr />
                    <h4>Account</h4>
                    <li>
                        <span className="material-symbols-outlined">bar_chart</span>
                        <Link to="#">Overview</Link>
                    </li>
                    <li>
                        <span className="material-symbols-outlined">mail</span>
                        <Link to="#">Message</Link>
                    </li>
                    <li>
                        <span className="material-symbols-outlined">settings</span>
                        <Link to="#">Settings</Link>
                    </li>
                    <li className="logout-link">
                        <span className="material-symbols-outlined">logout</span>
                        <Link to="/">Logout</Link>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default Dashbord;
