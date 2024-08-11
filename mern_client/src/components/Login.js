import React from 'react'
import bookImage from './image/book2.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginValidaton } from './LoginValidator';
import { useEffect } from 'react';

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();
        // Use the loginValidation function to check for input errors
        const loginvalidator = loginValidaton({ email, password });
        // Update the error state with the validation errors, if any
        setError(loginvalidator)
        // If there are validation errors, return early
        if (loginvalidator && Object.keys(loginvalidator).length > 0) {
            return;
        }
        const res = await fetch(`http://localhost:4700/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json();
        console.log(data)
        if (res.status === 400 && data.message.includes('user not found in DB')) {
            setError({ email: 'This user does not exist Please sign up' })
        }

        if (res.status === 400 && data.message.includes('password not match')) {
            setError({ password: 'Password is incorrect' })
        }

        try {
            if (res.status === 400 || !data) {
                // window.alert("invalid credentials")
                console.log("invalid credentials")

            } else {
                localStorage.setItem('token', data.token);
                setShowSuccessMessage(true);
                // window.alert("login success")
                // navigate('/dashbord')
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Automatically hide the success message after 2 seconds
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
                // Navigate to the dashboard here if you want to navigate after hiding the message
                navigate('/dashbord/AllBooks');
            }, 2000);
            return () => clearTimeout(timer)
        }
    }, [showSuccessMessage, navigate])

    const handleForgotPassword = async(e) =>{
        e.preventDefault()
        navigate('/forgotPassword')
    }
    return (
        <div>
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
                    boxSizing: "border-box",
                    paddingLeft: "256px"
                }}>
                    {showSuccessMessage && <div style={{ color: "white", backgroundColor: "green", padding: "8px", textAlign: "center", width:"60%",marginLeft:"20%", borderRadius:"5px" }}>Login successfull</div>}
                    <form method="POST" style={{ maxWidth: "75%", margin: "0 auto", fontSize: "15px" }}>
                        <h4 style={{ textAlign: "center", fontFamily: "red serifs", fontWeight: "bold" }}>Login</h4>


                        <label htmlFor="email" style={{ paddingTop: "10px", fontFamily: "red serifs" }}>Email:</label>
                        <input type="email" id="email" name="email" required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError({ ...error, email: "" })
                            }}

                            style={{ fontFamily: "red serifs", fontSize: "14px" }} />
                        {error.email && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.email}</p>}

                        <label htmlFor="password" style={{ paddingTop: "10px", fontFamily: "red serifs" }}>Password:</label>
                        <input type="password" id="password" name="password" required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError({ ...error, password: "" })
                            }}
                            style={{ fontFamily: "red serifs", fontSize: "14px" }} />
                        {error.password && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.password}</p>}

                        <Link  onClick={handleForgotPassword} style={{
                            color: "blue",
                            textAlign: "center",
                            fontSize: "13px",
                            paddingTop: "10px",
                            paddingLeft: "280px",
                            fontFamily: "red serifs"

                        }}>Forgot Password</Link>

                        <div className="button-container">
                            <button onClick={loginUser} type="submit" style={{ textAlign: "center", backgroundColor: "blue", fontFamily: "red serifs" }} >Login</button>
                        </div>
                        <div className='register-container' style={{ paddingTop: "10px", textAlign: "center", fontSize: "13px" }}>
                            <Link style={{ color: "blue", fontFamily: "red serifs" }} to="/signup">Don't have an account? Register</Link>
                        </div>
                    </form>
                </div>

            </div >

        </div>
    )
}

export default Login
