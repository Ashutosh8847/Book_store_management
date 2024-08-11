import React from 'react'
// import { Link } from 'react-router-dom'
import bookImage from "./image/book3.png"
import { useState } from 'react'
import { useParams,useLocation } from 'react-router-dom'
import { resetvalidation } from '../components/resetvalidator'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    console.log("Going to reset password")
    const location = useLocation();
    const { token } = useParams();

    // If the token is not available via useParams, try to extract it from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const urlToken = queryParams.get('token');

    console.log("**params**", useParams());
    console.log("**token**", token || urlToken);

    const [password, setNewPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState("")

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const validatior = resetvalidation({ password, confirm_password, token});
        setError(validatior)
        // If there are validation errors, return early
        if (validatior && Object.keys(validatior).length > 0) {
            return;
        }
        
        const res = await fetch(`http://localhost:4700/auth/reset-password?token=${urlToken}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, confirm_password ,  token: urlToken,})

        })

      
        console.log("response",res)
        const data = await res.json()
        console.log("***data***", data)
        console.log("NewPassword", password)
        console.log("***Confirm Password**", confirm_password)
        try {

            if (res.status === 400 && data.message.includes('user not found')) {
                setError({ newPasswod: 'The link is invaid or expired' })
            }
            else if (password !== confirm_password) {
                console.log("pasword does not match")
                setError({ confirmPassword: "Password does not match" })

            }

            else if (res.status === 400 && !data) {
                setError({ newPasswod: 'Something went wrong' });
                console.log('Something went wrong');
            } else {
                // window.alert("Password reset successfully")
                setShowSuccessMessage(true)
                console.log("password reset successfully")
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false)
            }, 4000)
            return () => clearTimeout(timer)
        }

    }, [showSuccessMessage])

    return (
        <div>
            <div>
                <div className='container' style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <div className='image-container'>
                        <img src={bookImage} alt="Book" style={{
                            width: '100%',
                            flex: "1",
                            padding: "0px",
                            boxSizing: "border-box"
                        }} />
                    </div>
                    <div className='form-container' style={{
                        flex: "1",
                        padding: "10px",
                        boxSizing: "border-box",
                        paddingLeft: "256px",

                    }}>
                        <form method="POST" style={{ maxWidth: "80%", margin: "0 auto", fontSize: "15px" }}>
                            {showSuccessMessage && <div style={{ color: "white", backgroundColor: "green", padding: "8px", textAlign: "center", width: "100%", borderRadius: "5px" }}>Password reset successfully</div>}

                            <h4 style={{ textAlign: "center", fontFamily: "red serifs", fontWeight: "bold" }}>Reset Password</h4>

                            <label htmlFor="password" style={{ paddingTop: "10px", fontFamily: "red serifs" }}>New Password:</label>
                            <input type="password" id="password" name="password" required placeholder='Enter your New Password'
                                style={{ fontFamily: "red serifs" }}
                                autoComplete="new-password" 
                                value={password}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setError({ ...error, password: "" })
                                }}

                            />
                            {error.password && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.password}</p>}

                            <label htmlFor="confirm_password" style={{ paddingTop: "10px", fontFamily: "red serifs" }}>Confirm Password:</label>
                            <input type="password" id="confirm_password" name="confirm_password" required placeholder='Confirm Password'
                                style={{ fontFamily: "red serifs" }}
                                value={confirm_password}
                                autoComplete="confirm_password" 
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError({ ...error, confirm_password: "" })
                                }}
                            />
                            {error.confirm_password && <p style={{ color: "red", fontFamily: "red serifs", margin: "0px" }}>{error.confirm_password}</p>}
                            <div className="button-container">
                                <button type="submit" onClick={(e) => handleResetPassword(e, urlToken || token)} style={{ textAlign: "center", backgroundColor: "red", fontFamily: "red serifs" }} >Submit</button>
                            </div>
                            <div className='register-container' style={{ paddingTop: "10px", textAlign: "center", fontSize: "17px" }}>
                                <Link style={{ color: "blue", fontFamily: "red serifs" }} to="/login">Back to Log in</Link>
                            </div>
                        </form>
                    </div>
                </div >
            </div>

        </div>
    )
}

export default ResetPassword
