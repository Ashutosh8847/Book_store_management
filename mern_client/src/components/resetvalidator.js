export const resetvalidation = ({password,confirm_password}) => {
    const error = {}

    if (password === "") {
        error.password = "*Password is required"
    }

    if (confirm_password === "") {
        error.confirm_password = "*Confirm Password is required"
    } else if (password !== confirm_password) {
        error.confirm_password = "*Confirm Passwords do not match with Password"
    }


    return error;

}