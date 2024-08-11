const express = require('express')
const User = require('../models/authmodel')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const createtoken = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, process.env.JWT_SECREAT, { expiresIn: "10hr" })
        return token
    } catch (error) {
        console.log(error)
    }
}
const secreatPassword = async (password) => {
    try {
        const saltRounds = 10;
        const passwordHassed = await bycrypt.hash(password, saltRounds)
        console.log(passwordHassed)
        return passwordHassed;
    } catch (error) {
        console.log(error)
    }
}
const registerUSer = async (req, res, next) => {
    try {
        const { fullname, username, email, password, confirm_password, mobile } = req.body

        console.log("Password", password)
        console.log("confirm_password", confirm_password)

        if (!fullname || !username || !email || !password || !confirm_password || !mobile) {
            res.status(422).json({ message: "please fill the required filled data" })
        }
        const Spassword = await secreatPassword(req.body.password)
        console.log("Spassword", Spassword)
        const user = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: Spassword,
            mobile: req.body.mobile
        })
        const userexist = await User.findOne({ email })

        if (password !== confirm_password) {
            res.status(422).json({ message: "confirm password not match with password" })

        } else if (userexist) {
            res.status(422).json({ message: "user already exist in the same email" })

        } else {
            const savedUser = await user.save()
            res.status(200).json({ message: "user created successfully", savedUser })
        }
    } catch (error) {
        console.log(error)
        res.status(422).json({ message: error.message })
    }

}

const userlogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userdata = await User.findOne({ email })
        // console.log(userdata)
        if (userdata) {
            const passwordMatch = await bycrypt.compare(password, userdata.password)
            if (passwordMatch) {
                const tokenData = await createtoken(userdata._id)
                // console.log("tokenData", tokenData)
                const userresult = {
                    _id: userdata._id,
                    fullname: userdata.fullname,
                    username: userdata.username,
                    email: userdata.email,
                    mobile: userdata.mobile,
                    updatedAt: userdata.updatedAt,
                    __v: userdata.__v,
                    token: tokenData
                }
                // console.log(userresult)
                const response = {
                    success: true,
                    message: "user details",
                    data: userresult
                }
                res.status(200).json(response)
            } else {
                res.status(400).json({ message: "password not match" })
            }
        } else {
            res.status(400).json({ message: "user not found in DB" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

// For Email purpose i am using nodemailer
const nodemailer = require("nodemailer");
const randomstring = require("randomstring")
const sendresetmail = async (req, res, email, name, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: "ashutosh@smartbots.ai",
            pass: "dzzu shsk xxpr iqao",
        },
    });
    const mailOption = {
        from: "master",
        to: email,
        subject: "Passwor Reset",
        html: `<h2>Password Reset</h2><p>Hello ${name},</p>
        <p>We received a request to reset your password. Click the link below to reset your password:</p>
        <a href="http://localhost:4700/auth/reset-password?token=${token}">Click here</a>
        <p>If you did not request a password reset, you can ignore this email.</p>
        <p>Thanks,<br>Your Application Team</p>`

    }
    console.log("Mailoptions", mailOption)
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            res.send(400).json({ message: error.message })
        } else {
            console.log("Email sent", info.response)
        }
    })
}

const forgotpassword = async (req, res, next) => {
    try {
        const email = req?.body?.email;
        console.log(email)
        const savedUser = await User?.findOne({ email })
        if (savedUser) {
            const randomString = randomstring.generate();
            const data = await User.updateOne({ email: email }, { $set: { token: randomString } })
            console.log(data)
            if (data) {
                sendresetmail(req, res, savedUser.email, savedUser.fullname, randomString)
                res.status(200).json({ message: "Email sent successfully" })
            } else {
                res.status(400).json({ message: "Email didn't send please try again" })
            }

        } else {
            res.status(400).json({ message: "User not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })

    }
}

const resetPassword = async (req, res, next) => {
    try {
        const token = req.query.token;
        console.log("token", token)
        const tokenData = await User.findOne({ token: token })
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        if (password !== confirm_password) {
            res.status(400).json({ message: "password and confirm password didn't match" })
        }
        else if (tokenData) {
            const password = req.body.password;
            console.log("****new password ****", password)
            const newPassword = await secreatPassword(password)
            const newData = await User.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: newPassword, token: '' } }, { new: true })
            console.log(newData)
            if (newData) {
                res.status(200).send({ success: true, msg: "Password reset successfully", data: newData })
            } else {
                res.status(400).json({ message: "password not reset" })
            }

        } else {
            res.status(400).json({ message: "user not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })

    }

}


module.exports = {
    registerUSer,
    userlogin,
    forgotpassword,
    resetPassword
}