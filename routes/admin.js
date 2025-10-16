const { Router } = require("express");
const { adminModel } = require("../db");
const { bcrypt } = require("bcrypt");
const { jwt } = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

app.use(express.json());
const adminRouter = Router();



adminRouter.post("/signup", async (req,res) => {
    const {
      email,
      password,
      firstName,
      lastName,
    } = req.body

     const hashedPassword = await bcrypt.hash(password, 5);
    
    await adminModel.create ({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })


    res.json({
        message: "signup successful"
    })
})

adminRouter.post("/signin", async (req,res) => {
    const {email, password} = req.body;



    const admin = await adminModel.findOne ({
        email: email
    });

    if(admin) {
       const token = jwt.sign({
        id: admin._id
    }, JWT_ADMIN_PASSWORD);

    res.json({
        token: token
    }) 
    } else {
        res.status(403).json ({
            message: "incorrect credentials"
        })
    }
})

adminRouter.post("/create", adminMiddleware, async (req,res) => {
   
    const adminId = req.userId;

    const course = await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/courses", adminMiddleware, async (req,res) => {
   const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/bulk", async (req,res) => {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json ({
        message: "course updated",
        courses
    })
})


module.exports = {
    adminRouter: adminRouter
};












module.exports = {
    adminRouter : adminRouter
};
