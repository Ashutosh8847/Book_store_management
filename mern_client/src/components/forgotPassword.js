import React from 'react'
import bookImage from './image/book3.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { loginValidaton } from './LoginValidator'
import { useEffect } from 'react'


const ForgotPassword = () => {
    console.log("Going to forgot password")
    const [email, setEmail] = useState("");
    const [error, setError] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const submitClickHandler = async (e) => {
        e.preventDefault();
        console.log(email)

        const forgotValidator = loginValidaton({ email })
        setError(forgotValidator)
        if (forgotValidator && Object.keys(forgotValidator).length > 0) {
            return;
        }
        try {
            const res = await fetch(`http://localhost:4700/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })
            const data = await res.json();
            console.log("**data**", data)

            try {
                if (res.status === 400 && data.message.includes('User not found')) {
                    setError({ email: "This user email does not exist Please sign up" })
                }
                if (res.ok) {
                    setShowSuccessMessage(true)
                    // window.alert("Please check your email")
                }
                if (res.status === 400 || !data) {
                    console.log("something went wrong")
                    setError({ email: "This user email does not exist Please sign up" })
                    // window.alert("Something went wrong")
                } else {
                    // window.alert("Please check your email")
                    setShowSuccessMessage(true)
                    console.log("Check your register email")
                }
            } catch (error) {
                console.log(error)
                setError({ h4: "some thing went wrong" })
            }
        } catch (err) {
            console.log(err)
            setError({ h4: "some thing went wrong"  })
        }
    }
    useEffect(() => {
        if(showSuccessMessage){
           const timer = setTimeout(()=>{
                setShowSuccessMessage(false)
            },4000)
            return ()=> clearTimeout(timer)
        } 
    },[showSuccessMessage])

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
                    <form method="POST" style={{ maxWidth: "75%", margin: "0 auto", fontSize: "15px" }}>
                    {showSuccessMessage && <div style={{ color: "white", backgroundColor: "green", padding: "8px", textAlign: "center", borderRadius:"5px" }}>Email sent successfully</div>}
                        <h4 style={{ textAlign: "center", fontFamily: "red serifs", fontWeight: "bold" }}>Forgot Password</h4>
                        <label htmlFor="email" style={{ paddingTop: "10px", fontFamily: "red serifs" }}>Email:</label>
                        <input type="email" id="email" name="email" required placeholder='Enter your Email'
                            style={{ fontFamily: "red serifs" }}
                            value={email}
                            onChange={(e) => {
                                setEmail(e?.target?.value);
                                setError({ ...error, email: "" })
                            }}
                        />
                        {error.email && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.email}</p>}
                        <div className="button-container">
                            <button type="submit" onClick={submitClickHandler} style={{ textAlign: "center", backgroundColor: "blue", fontFamily: "red serifs" }} >Submit</button>
                        </div>
                        <div className='register-container' style={{ paddingTop: "10px", textAlign: "center", fontSize: "17px" }}>
                            <Link style={{ color: "blue", fontFamily: "red serifs" }} to="/login">Log in</Link>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    )
}

export default ForgotPassword
