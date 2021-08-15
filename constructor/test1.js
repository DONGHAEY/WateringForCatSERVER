class Person {
    constructor (_age, _year) {
        this.value = (_year - _age);
    }
    describe() {
        console.log(`haha this is magic ${this.value}`)
    }
}

class Programmer extends Person {
    constructor(_name, _age, _years) {
        super(_age, _years)
        this.name = _name;
    }
}

let valu = new Programmer('Donghyeon', 16, 2021)

let exten = `${valu.name}님의 출생 년도는 ${valu.value}입니다`

console.log(exten)


class User {
    constructor(email, name) { //make new user object
        this.email = email;
        this.email = name;
        this.score = 0;
    }
    login() {
        console.log(this.email, 'just logged in')
        return this;
    }
    logout() {
        console.log(this.email, 'just logged out')
        return this;
    }
    updateScore() {
        this.score++;
        console.log(this.email, 'socore is now', this.score)
        return this;
    }
}

const userOne = new User('ryu@ninjas.com', 'Ryu')
const userTwo = new User('rayu@ninjas.com', 'Rayu')

userOne.updateScore()









