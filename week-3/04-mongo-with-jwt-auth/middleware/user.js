const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authHeaderKey = req.headers.authorization;
    const words = authHeaderKey.split(" ");
    const token = words[1];

    const decodedValue = jwt.verify(token,JWT_SECRET);

    req.username = decodedValue.username; // <- VERY USEFUL

    if(decodedValue.username){
        next();
    }else{
        res.status(411).json({
            message:"you are not authenticated"
        })
    }

}

module.exports = userMiddleware;