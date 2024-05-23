const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken")




// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const authHeaderKey = req.headers.authorization;
    const words = authHeaderKey.split(" ");
    const token = words[1];

    const decodedValue = jwt.verify(token,JWT_SECRET);
    if(decodedValue.username){
        next();
    }else{
        res.status(411).json({
            message:"you are not authenticated"
        })
    }

}

module.exports = adminMiddleware;