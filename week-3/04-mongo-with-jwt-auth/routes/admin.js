const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin,Course } = require("../db")
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken")

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check if user with this database already exists

    await Admin.create({
        username:username,
        password:password
    })
    res.json({
        message:"Admin created successfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const userObj = await Admin.findOne({
        username,
        password
    })

    if(userObj){
        const token=jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token:token
        })
    }else{
        res.status(411).json({
            message:"incorrect email and password"
        })
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    // use zod here

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message:"Course created successfully",
        Course_id : newCourse._id
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const AllCourses = await Course.find({});
    res.json({
        Courses:AllCourses
    })
});

module.exports = router;