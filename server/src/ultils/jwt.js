const jwt = require('jsonwebtoken');
const createToken = ({payload,settings}) => {
    let accessToken = jwt.sign(payload,process.env.PRIVATE_KEY,settings);
    return accessToken
}
const verifyToken = (token) => {
    return new Promise((resolve,reject)=>{
        try {
            jwt.verify(token,process.env.PRIVATE_KEY,function(err, decoded) {
                if(err) resolve(false)
                resolve(true)
            })
        } catch (error) {
            resolve(false)
        }
    });
}
const decodeToken = (token) => {
    return new Promise((resolve,reject)=>{
        try {
            resolve(jwt.decode(token))
        } catch (error) {
            resolve(false)
        }
    });
}
module.exports = {
    createToken,
    verifyToken,
    decodeToken
}