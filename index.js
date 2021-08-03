const express =require("express");
const app = express();
const port = 3000;

const { User } = require("./models/User"); //User.js에서 내보내는 User모델을 불러온다.
const mongoose = require("mongoose"); //몽구스 모듈을 불러왔다..

const config = require("./config/key"); //keyjs를 실행하여 불러와
const keyValue = config.mongoURI; //mongourl를 가져온다

app.use(express.urlencoded({extended: true})); //extended 옵션의 경우, true일 경우, 객체 형태로 전달된 데이터내에서 또다른 중첩된 객체를 허용한다는 말이며, false인 경우에는 허용하지 않는 다는의비니다.
app.use(express.json()); //json으로 통신을 하기위해 json모듈을 사용한다

mongoose.connect(keyValue, {
    useNewUrlParser:  true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB connected...')) //DB로 연결하여라 연결 로직이 잘 수행되면 콘솔로그를 찍고, 에러가 발생하면 error을 로그로 출력시켜라
.catch (err => console.log(err));

app.get ("/", (req, res) => { //'/'로 접속하면 helloworld를 respond하라
    res.send("Hello World!");
    console.log(config.mongoURI);
});

app.post('/register', (req, res)=> {
    const user = new User(req.body);
    console.log (user);
    user.save((err, userInfo) => {
        if(err) return res.json ({ success: false, err});
        return res.status(200).json({success: true});
    });
});
//회원 가입 할 때, 필요한 정보들을 client에서 가져오면
//그것들을 데이터 베이스에 넣어준다.

app.listen(port, () => console.log(`started on ${port}!`));