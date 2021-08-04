"use strict"

const get = require("./cd");
const value = 8;
const ppl = get.hello;

ppl(value, (err, pp) => {
    if (err) console.log("error");
    else console.log(pp);
});