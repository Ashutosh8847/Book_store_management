export const validation = ({ user }) => {
    const error = {}
    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // console.log("user.fullname", user.fullname)

    if (user.fullname === "") {
        error.fullname = "*Name is required"
    }

    if (user.email === "") {
        error.email = "*Email is required"
    } else if (!emailpattern.test(user.email)) {
        error.email = "*Email is not valid"
    }
    if (user.username === "") {
        error.username = "*Username is required"
    }

    if (user.password === "") {
        error.password = "*Password is required"
    }

    if (user.confirm_password === "") {
        error.confirm_password = "*Confirm Password is required"
    } else if (user.password !== user.confirm_password) {
        error.confirm_password = "*Confirm Passwords do not match with Password"
    }

    if (user.mobile === "") {
        error.mobile = "*Mobile is required"
    }
    return error;

}