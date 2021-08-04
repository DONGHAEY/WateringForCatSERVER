const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        maxlength: 100
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
                //console.log(hash);
                next(); //다음으로 넘어가라
            })
        })
    }
    else {
        next(); //비밀번호를 바꾸는게 아니면 그냥 넘어가라..
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) { //userSchema에 comparePassword라는 메서드를 만들고 그건 함수이다 파라미터는 plainPassword와 callbackfunction이 있다. 
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => { //bcrypt.compare을 이용하여 사용자에게 받은 비밀번호와 이 유저 데이터베이스 비밀번호와 비교한다, 그리고 콜백함수를 실행하는데 에러와 이즈메치를 받고
        if(err) return cb(err) //에러를 받으면 cb로 에러를 전달한다
        cb(null, isMatch) //아니면 성공되었음을 전달한다
    })
}

userSchema.methods.generateToken = function(cb) {
    //jsonwbtoken을 이용해서 token을 생성하기
    const user = this; //userSchema를 말한다
    const token = jwt.sign(user.id, 'secretToken');
    user.token = token;

    user.save(function(err, user) {
        if(err) return cb(err)
        else cb(null, user)
    })
}

userSchema.methods.findByToken = (token, cb)=> {
    const user = this;
    //token을 여기서 디코드한다
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        user.findOne({ "_id": decoded, "token": token}, (err, user)=> {
            if (err) return cb(err);
            cb(null, user);
        })
        //클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
    })
}

const User = mongoose.model('User', userSchema) //User라는 이름으로 모델(콜렉션들)을 만들고 그 모델안에는 userSchema object를 스키마로 넣어라..

module.exports = { User }; // 내보낸다.