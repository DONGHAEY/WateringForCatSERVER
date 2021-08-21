//안녕하세요 제가 auth기능을 추가하였는데, cookie가 안불러와집니다 조금만 도움 요청드립니다.

const express =require("express"); //express모듈을 불러온다
const app = express(); //app에다가 express를 사용할 수 있도록 해준다 
const port = 5000; //port를 설정한다


const mongoose = require("mongoose"); //몽고DB를 사용하기 위해 몽구스 모듈을 불러왔다..

const { User, Machine } = require("./models/User"); //User.js에서 내보내는 User모델을 불러온다.

const cookieParser = require("cookie-parser");

const { auth } = require("./middleware/auth");

const config = require("./config/key"); //keyjs를 실행하여 불러와
const keyValue = config.mongoURI; //mongourl를 가져온다

app.use(express.urlencoded({extended: true})); //extended 옵션의 경우, true일 경우, 객체 형태로 전달된 데이터내에서 또다른 중첩된 객체를 허용한다는 말이며, false인 경우에는 허용하지 않는 다는의비니다.
app.use(express.json()); //json으로 통신을 하기위해 json모듈을 사용한다
app.use(cookieParser());

mongoose.connect(keyValue, {
    useNewUrlParser:  true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB connected...')) //DB로 연결하여라 연결 로직이 잘 수행되면 콘솔로그를 찍고, 에러가 발생하면 error을 로그로 출력시켜라
.catch (err => console.log(err));

app.get ("/", (req, res) => { //'/'로 접속하면 helloworld를 respond하라
    console.log(req.body.email)
});


app.post('/api/users/posts', (req, res) => {
    const HwData = req.body;
    console.log(HwData);
});

app.post('/api/users/register', (req, res)=> { // /register로 POST요청이 들어오면
    const user = new User(req.body); //user는 post로 받아온값을 User()통해 DB에 생성한다
    user.save((err, userInfo) => { //user는 post로 받아온값을 User.save()통해 DB에 저장한다
        console.log(user);
        if(err) return res.json ({ success: false, err});
        return res.status(200).json({success: true});
    });
});
//회원 가입 할 때, 필요한 정보들을 client에서 가져오면
//그것들을 데이터 베이스에 넣어준다.


app.post ("/api/users/login", (req, res) => {
    const r = req.body;
    const email = r.email;
    User.findOne({email: email}, (err, user) => { //사용자에게서 입력받은 이메일에 대한 콜렉션을 찾고, 파라미터를 받는다 (에러와 그 사용자의 데이터베이스)
        console.log(user);
        if(!user) { //유저값이 들어오지 않았으면
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다"
            }) //이것을 리턴값으로 보내라
        } //유저값이 들어왔으면..
        const pass = r.password;
        user.comparePassword(pass, (err, isMatch)=> { //그 유저 데이터베이스에 대하여.함수를 실행하라(비밀번호보내고, 콜백함수 보낸다)
            if(!isMatch) return res.json ({ loginSuccess: false, message: "비밀번호가 틀렸습니다."}) //콜백함수에서 isMatch가 들어오지 않으면 이걸 실행해라
            console.log("success");

            user.generateToken(function(err, usr) {
                if(err) return res.status(400).send(err);
                //토큰을 저장한다. (쿠키 or 로컬)
                res.cookie("x_auth", usr.token)
                .status(200)
                .json({ loginSuccess : true, userId:usr._id})
            })
        })
    })
})


app.get ('/api/users/auth', (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 이야기는 Authentication이 True라는 말
    const r =req.cookies;
    const token = r.x_auth;
    auth(token, (err, user)=> {
        if (err) res.status(400).json({ isAuth:false, err });
        else if (!user) res.json({ isAuth:false });
        else {
            res.status(200).json({
                _id: user._id,
                isAdmin: user.role === 0 ? false : true, 
                isAuth: true, 
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                role: user.role,
                image: user.image
           })
        }
    })
})

app.get ('/api/users/logout', (req, res) => {
    console.log("dsf")
    const r = req.cookies;
    const key = r.x_auth;
    auth (key, (err, user)=> {
        if (err) return res.send({ succes:false });
        if (!user) return res.send({ success:false });
        console.log("여기까지나 했네..")
        User.findOneAndUpdate({_id:user._id }, { token:""}, (err, user)=> {
            if(err) return res.json ({ success:false });
            return res.status(200).send({
                success:true
            })
        })
    });
})

app.post ('/api/chart', (req, res)=> {
    console.log("dsf")
    const key = req.cookies.x_auth;
    User.find(key, (ui_)=> {
        Machine.findOne({ui:ui_}, (err, machine) => {
            if(err);
            if(!machine) return res.status(400)
            const dbDate = machine.dat;
            const dbSecond = machine.second;
            let dbDate_l = dbDate.length-1
            // console.log(dbDate_l); 4이 나온다.
            // let p = 6;
            // let arrDate = ['none', 'none', 'none', 'none', 'none', 'none', 'none'];
            // let arrSecond = [0, 0, 0, 0, 0, 0, 0];
            // for(let i=dbDate_l; i>dbDate_l-7; i--) {
            //     if (dbDate[i] !== 'start') {
            //         arrDate[p] = dbDate[i];
            //         arrSecond[p] = dbSecond[i];
            //         p--;
            //     } else {
            //         break;
            //     }
            // }
            res.json({
                date:dbDate,
                second:dbSecond
            })
        })
    })
})


app.post('/posts', (req, res) => {
    Machine.findOne({mi:req.body.mi}, (err, machine) => {
        if(!err) {
            let today = new Date().toLocaleDateString();
            const dat = machine.dat;
            const second = machine.second;
            const dateArray = dat.pull(); //날짜 배열을 불러온다
            const lastdate = dateArray[dateArray.length-1]; //배열에서 마지막 부분을 lastdate에 저장
            if (lastdate !== today) { //만약 마지막에 저장된 날짜가 오늘과 같지 않니?
                dat.push(today); //그러면 새로 인덱스를 만들고 그곳에 오늘 날짜를 저장해~
                second.push(req.body.ws); //그리고 iot에서 불러온 값도 새 인덱스에 저장해~
            } else { //오늘과 같으면..
                const lastsecond = second.pop() //초 마지막 값을 불러온다
                const location = dateArray.indexOf(today);
                const sec = req.body.ws + lastsecond
                second.set(location, sec)
                machine.wh = req.body.wh;
                machine.wc = req.body.wc;
            }
            machine.save(err => {
                if(err) return res.json({Success:false});
                res.json({Success:true});
            }) 
        }
    })
})

app.post('/api/make', (req, res) => {
    const achine = new Machine(req.body);
    const key = req.cookies.x_auth;
    User.find(key, (ui_)=> {
        achine.ui = ui_
        achine.dat.push("start");
        achine.second.push();
        achine.save(err => {
            if(err) return res.json({Success:false})
            return res.json({Success:true})
        })
    });
})

app.get('/api/hhc', (req, res)=> {
    const r = req.cookies;
    const key = r.x_auth;
    const id = User.find(key, (ui_)=> {
        Machine.findOne({ui:ui_}, (err, machine) => {
            if(err);
            if(!machine) return res.status(400)
            res.status(200).json({
                wh: machine.wh,
                wc: machine.wc,
                ws: machine.second.pop()
            })
        })
    })
})


app.listen(port, () => console.log(`started on ${port}!`)); //app.listen을 사용하여 서버를 실행시킨다, 그리고 몇번 포트에서 열렸는지 알려주는 함수를 실행한다.