"use strict"

const ppp = {
    hello (value, cbf) { //cbf has err and pp
        if (value=='5') return cbf(1, null);
        return cbf (null, value+8);
    }
}


module.exports = ppp;