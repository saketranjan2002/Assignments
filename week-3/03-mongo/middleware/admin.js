const { Admin } = require("../db");
// Middleware for handling auth
function adminMiddleware(req, res, next){
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    
    // why in headers
    // only username will work and not UserName, userName because all header get converted to lower case.
    
    const username = req.headers.username;
    const password = req.headers.password;
    Admin.findOne({
        username:username,
        password:password
    })
    .then(function(value){
        if(value){
            next();
        }
        else{
            console.log(value);
            res.status(403).json({
                message:"Admin don't exist"
            })
        }
    })
}

module.exports = adminMiddleware;