const mongoose = requires("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type:String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique:1
    },
    password: {
        type:String,
        maxlength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type:String
    },
    tokenExp: {
        type:Number
    },
    Hwkey : {
        type:String
    }
})

const User = mongoose.model('User', userSchema) //User라는 이름으로 모델을 만들고 그 모델안에는 userSchema object를 스키마로 넣어라..

module.exports = {User};