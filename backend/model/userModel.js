const mongoose = require ('mongoose')
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        require : true ,
        min : 3,
        max : 20,
        unique : true,
    },
    email : {
        type : String,
        require : true ,
        unique : true,
        max : 50,
    },
    password : {
        type : String,
        require : true ,
        min : 8,
        max : 50,
    },
    isAvatarImageSet : {
        type : Boolean,
        default : false,
    },
    avatarImage : {
        type : String,
        default : "",
    },

})

module.exports = mongoose.model("Users", userSchema)