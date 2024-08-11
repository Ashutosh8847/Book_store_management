const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile:{
        type:Number,
        require:true
    },
    token:{
        type:String,
        deafult:null
    }

},
    { timestamps: true }
)

const User = mongoose.model('user', userSchema);
User.createIndexes()
module.exports = User;