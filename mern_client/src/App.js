import './App.css';
import Dashboard from './components/dashbod';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUP from './components/SignUP';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';
import UploadBooks from './components/uplaodBooks';
import AllBooks from './components/allBooks';
import UpdateBook from './components/UpdateBook';
// import DeleteBooks from './components/DeleteBooks';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          {/* <Alert  Alert={alert}/> */}
          <div className=''>
          <Routes>
          
            <Route exact path="/dashbord" element={<Dashboard />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUP />} />
            <Route exact path="/forgotPassword" element={<ForgotPassword />} />
            <Route exact path="/resetPassword" element={<ResetPassword />} />
            <Route exact path="/dashbord/UploadBooks" element={<UploadBooks />} />
            <Route exact path="/dashbord/AllBooks" element={<AllBooks />} />
            <Route exact path="/dashbord/update-books/:id" element={<UpdateBook />} />
            {/* <Route exact path="/dashbord/delete-books/:id" element={<DeleteBooks />} /> */}

          </Routes> 
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
