"use strict"

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }
    async login() {

        const cleint = this.body; //코드가 더러워서 바로 body선언으로
        
        const { id, psword } = (await UserStorage.getUserInfo(cleint.id));

       if (id) {
           if(id === cleint.id && psword === cleint.psword) {
               return { success : true};
           }
           return { success : false, msg: "비밀번호가 틀렸습니다" };
       }
       return { success : false, msg: "존재하지 않는 아이디입니다"};
    }

    async register() {
        const client = this.body;
        try {
        const response = await UserStorage.save(client);
        return response;
        } catch (err) {
            return { success :false, msg: err };
        }
    }
}

module.exports = User;