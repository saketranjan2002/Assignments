const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course } = require("../db");

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

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    const AllCourses = await Course.find({});
    res.json({
        Courses:AllCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const password = req.headers.password;


// Approach 1

    const userObj =  await User.findOne({
        username:username,
        password:password
    })

    const userPurchasedCourse = userObj.purchasedCourses;

    userPurchasedCourse.push(courseId);
    userObj.purchasedCourses = userPurchasedCourse;

    try{
        await User.updateOne({
            username:username,
            password:password
        },{
            "$set":{
                purchasedCourses : userPurchasedCourse
            }
        });
    }
    catch(e){
        console.log(e);
    }

    res.json({
        message:"Course Purchased Successfully"
    })

// More Clean Approach
// Approach 2


// await User.updateOne({
//     username,
//     password
// },{
//     "$push":{
//         purchasedCourses:courseId
//     }
// });




    




});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const password = req.headers.password;

/*    
    const userObj = await User.findOne({
        username,
        password
    });

    const purchasedCourses=[];

    for(let i=0;i<userObj.purchasedCourses.length;i++){
        purchasedCourses.push(
            await Course.findOne({
                _id:userObj.purchasedCourses[i]
            })
        )
    };


    res.json({
        purchasedCourses:purchasedCourses
    })

*/


    const userObj = await User.findOne({
        username,
        password
    });

    const courses = await Course.find({
        _id:{
            "$in": userObj.purchasedCourses
        }

    })


    res.json({
        purchasedCourses:courses
    })

});

module.exports = router