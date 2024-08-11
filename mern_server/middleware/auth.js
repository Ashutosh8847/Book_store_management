const jwt = require('jsonwebtoken')

const verifytoken = async(req,res,next) =>{
    const token = req.body.token || req.query.token || req.headers["authorization"];
    if(!token){
        res.status(404).json({ message: "Auth Token is required for authentication" })
    }else{
        try {
            const decode = jwt.verify(token,process.env.JWT_SECREAT);
            req.user =  decode
            
        } catch (error) {
            res.status(500).json({ message: error.message })
            
        }
    }
    return next();


}

module.exports = verifytoken;