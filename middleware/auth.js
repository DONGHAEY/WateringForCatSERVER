const { User } = require("../models/User");

let auth = (req, res, next) => {
    //verfity를 하는 곳
    //클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;
    ///토큰을 디코드 한 후 id_를 통해 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if (!user) return res.json ({isAuth: false, error: true})
        req.token = token; //
        req.user = user; //request할 때 유저 정보를 줄 수 있게
        next();
    })
    //DB에 그 id_유저가 있으면 인증 한다

    //없으면 인증안한다
}

module.exports = { auth };