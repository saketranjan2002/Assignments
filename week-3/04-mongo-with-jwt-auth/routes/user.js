const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course } = require("../db/index")
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    const purchasedCourses = [];

    User.create({
        username:username,
        password:password,
        purchasedCourses:purchasedCourses
    })
    .then(()=>{
        res.json({
            message:"User created successfully"
        })
    })
});

router.post('/signin',async (req, res) => {
    // Implement admin signup logic

    const username = req.body.username;
    const password = req.body.password;

    const usrObj = await User.findOne({
        username,
        password
    })
    // console.log(usrObj);
    if(usrObj){  // Can also do authorization check here
        const token = jwt.sign({
            username,
        },JWT_SECRET);
        res.json({
            token:token
        })
    }else{
        res.status(411).json({
            message:"Authentication failed"
        });
    }


});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const AllCourses = await Course.find({});
    res.json({
        Courses:AllCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

/*
    const courseId = req.params.courseId;
    const authHeader = req.headers.authorization;
    const words = authHeader.split(" ");
    const token = words[1];

    const decodedValue = jwt.verify(token,JWT_SECRET);

    console.log(decodedValue);

    await User.updateOne({
        username:decodedValue.username
    },
        {
            "$push":{
                purchasedCourses:courseId
            }
        }
    );

    res.json({
        message:"Course Added Successfully"
    });
    
*/


//  Better approach -> {send username in req in userMiddleware implementation}
    const courseId = req.params.courseId;
    const authHeader = req.headers.authorization;
    const words = authHeader.split(" ");
    const token = words[1];

    const username = req.username;

    await User.updateOne({
        username
    },{
        "$push":{
            purchasedCourses:courseId
        }
    });


    res.json({
        message:"Course Added Successfully"
    });

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const username = req.username;
    const user = await User.findOne({
        username
    })

    const purchasedCourse = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    });

    res.json({
        Courses:purchasedCourse
    });

});

module.exports = router