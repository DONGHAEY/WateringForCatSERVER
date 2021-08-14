const { User } = require("../models/User");

const auth = (token, cb) => {
    //verfity를 하는 곳
    //클라이언트 쿠키에서 토큰을 가져온다
    User.findByToken(token, (err, user) => {
        cb(err, user);
    })
}

module.exports = { auth };