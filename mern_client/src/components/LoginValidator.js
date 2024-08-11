export const loginValidaton = ({email,password }) =>{
    console.log('Email:', email);

    const error = {}
    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === ""){
        error.email = "Please Enter Email"
    }else if(!emailpattern.test(email)){
        error.email = "Please Enter Valid Email"
    }

    if(password === ""){
        error.password = "Please Enter Password"
    }

    return error;

}