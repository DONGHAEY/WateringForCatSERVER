const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
});

userSchema.pre('save', function(next) { //몽구스에서 save logic 실행전에 이 함수를 실행하라
    //비밀번호를 암호화하는 함수 작성
    const user = this; //userSchema를 말한다
    if (user.isModified('password')) { //password가 변환되었을때 아래 로직을 수행한다
        bcrypt.genSalt(saltRounds, (err, salt) => { //genSalt를 사용하여 saltRounds를 보내고, err와 salt를 받아 함수를 실행한다.
            if(err) return next(err); //에러가 있다면 err를 주고 다음으로 넘어가라
            bcrypt.hash(user.password, salt, (err, hash) => { //암호화해주는 핵심 부분 //hash를 통해 비밀번호를 보내고, 위의 함수에서 받은 salt를 보내고, err와 hash를 받아서 아래 로직을 실행하라. 
                if(err) return next(err); //만약 에러가 있따면 err을 주고 넘어가라
                user.password = hash; //암호화 된것으로 바꿔준다
                console.log(hash);
                next(); //다음으로 넘어가라
            })
        })
    }
    else {
        next(); //비밀번호를 바꾼는게 아니면 그냥 넘어가라..
    }
})

const User = mongoose.model('User', userSchema) //User라는 이름으로 모델(콜렉션)을 만들고 그 모델안에는 userSchema object를 스키마로 넣어라..

module.exports = { User }; // 내보낸다.