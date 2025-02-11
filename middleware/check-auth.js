const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next();
    }
    try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        throw new Error('Authentication Failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId }; 
    return next();
    } catch(err) {
        const error = new HttpError('Authenication Failed!', 403);
        return next(error);
    }
    

}