import React from 'react';
import './signup.css';
import bookImage from './image/bookimage.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validation } from './validation ';
import { useEffect } from 'react';

const SignUp = () => {
  let navigate = useNavigate();
  const [error, setError] = useState({});
  const [showSuccessMessage,setShowSuccessMessage]=useState(false);
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
    confirm_password: "",
  });

  let name, value;
  const handleInput = async (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
    // Clear the error message for the corresponding field
    setError((error) => ({ ...error, [name]: "" }));
  }

  const postData = async (e) => {
    e.preventDefault();
    // setError(validation({ user }));
    const validationError = validation({ user });
    console.log("*****valdationerror****", validationError)
    if (Object.keys(validationError).length > 0) {
      console.log("*******Object.keys(validationError).length****", Object.keys(validationError).length)
      setError(validationError);
      return;
    }
    try {
      const { fullname, username, email, password, mobile, confirm_password } = user;
      console.log("password", user.password)
      console.log("confirm_password", user.confirm_password)
      const res = await fetch(`http://localhost:4700/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"

        },
        body: JSON.stringify({ fullname, username, email, password, mobile, confirm_password })

      })
      if (!res.ok) {
        // Handle HTTP error status
        const contentType = res.headers.get('Content-Type');
        console.log("****contentType****", contentType);
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          console.log("***data***", data)

          if (res.status === 422 && data.message.includes('user already exist in the same email')) {
            setError({ email: "User with this email already exists. Please login." })
          }
          else {
            setError(data.message)
          }
          console.error('Registration failed:', data.message);
        } else {
          // Handle non-JSON response (e.g., HTML error page)
          const text = await res.text();
          setError('An unexpected error occurred. Please try again.');
          console.error('Non-JSON response:', text);
        }
      } else {
        const data = await res.json();
        console.log("data", data)
        if (data.status === 422 || !data) {
          setError(data.message);
          window.alert("Invalid Registation")
          console.log("Invalid Registation")
        } else {
          setError({});
          setShowSuccessMessage(true)
          // window.alert("Registation Successfull")
          console.log("Registation Successfull")
          // navigate('/login')
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An unexpected error occurred. Please try again.');

    }
  }

  useEffect(() => {
    // Automatically hide the success message after 2 seconds
    if (showSuccessMessage) {
        const timer = setTimeout(() => {
            setShowSuccessMessage(false);
            // Navigate to the dashboard here if you want to navigate after hiding the message
            navigate('/login');
        }, 2000);
        return () => clearTimeout(timer)
    }
}, [showSuccessMessage, navigate])

  return (
    <div className='container' style={{
      display: "flex",
      justifyContent: "spaceBetween",
      alignItems: "center",
    }}>
      <div className='image-container'>
        <img src={bookImage} alt="Book" style={{
          width: '100%', flex: "1",
          padding: "0px",
          boxSizing: "border-box"
        }} />
      </div>
      <div className='form-container' style={{
        flex: "1",
        padding: "10px",
        boxSizing: "border-box"
      }}>
        <form method='POST' style={{ maxWidth: "75%", margin: "0 auto", fontSize: "15px" }}>
        {showSuccessMessage && <div style={{ color: "white", backgroundColor: "green", padding: "8px", textAlign: "center", width:"60%",marginLeft:"20%", borderRadius:"5px" }}>Signup successfull</div>}
          <h4 style={{ textAlign: "center", fontFamily: "red serifs", fontWeight: "bold" }}>SignUp</h4>

          <label htmlFor="fullname" style={{ fontFamily: "red serifs" }}>Full Name:</label>
          <input type="text" id="fullname"
            value={user.fullname}
            onChange={handleInput}
            name="fullname" required
            style={{ fontFamily: "red serifs", fontSize: "14px" }} />
          {error.fullname && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.fullname}</p>}
          <label htmlFor="username" style={{ fontFamily: "red serifs" }}>Username:</label>
          <input type="text" id="username"
            value={user.username}
            onChange={handleInput}
            name="username" required
            style={{ fontFamily: "red serifs", fontSize: "14px" }} />
          {error.username && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.username}</p>}

          <label htmlFor="email" style={{ fontFamily: "red serifs" }}>Email:</label>
          <input type="email"
            value={user.email}
            onChange={handleInput}
            id="email" name="email" required
            style={{ fontFamily: "red serifs", fontSize: "14px" }} />
          {error.email && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.email}</p>}

          <label htmlFor="mobile" style={{ fontFamily: "red serifs" }}>Mobile:</label>
          <input type="text"
            value={user.mobile}
            onChange={handleInput}
            id="mobile" name="mobile" required
            style={{ fontFamily: "red serifs", fontSize: "14px" }} />
          {error.mobile && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.mobile}</p>}

          <label htmlFor="password" style={{ fontFamily: "red serifs" }}>Password:</label>
          <input type="password"
            value={user.password}
            onChange={handleInput}
            id="password" name="password" required
            style={{ fontFamily: "red serifs", fontSize: "14px" }} />

          {error.password && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.password}</p>}

          <label htmlFor="confirm_password" style={{ fontFamily: "red serifs" }}>Confirm Password:</label>
          <input type="password"
            value={user.confirm_password}
            onChange={handleInput}
            id="confirm_password" name="confirm_password" required
            style={{ fontFamily: "red serifs", fontSize: "14px" }} />
          {error.confirm_password && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.confirm_password}</p>}
          <div className="button-container">
            <button onClick={postData} type="submit" style={{ textAlign: "center", fontFamily: "red serifs" }}>Register</button>
          </div>
        </form>
      </div>
    </div >
  );
}

export default SignUp;
