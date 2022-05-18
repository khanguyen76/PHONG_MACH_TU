const bcrypt = require('bcrypt');
const saltRounds = process.env.SALTROUNDS || 10;

const encode = (text) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(text,saltRounds, function (err, hash) {
            if (err) console.log("ERROR HASH", err);
            resolve(hash)
        })
    })
}
const compare = (text1,text2) =>  bcrypt.compare(text1,text2)
module.exports = {
    encode,
    compare,
}