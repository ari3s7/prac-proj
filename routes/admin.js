const { Router } = require("express");
const { adminModel } = require("../db")


const adminRouter = Router()



adminRouter.post("/signup", (req,res) => {
    res.json({
        message: "sign up user"
    })
})

adminRouter.post("/signin", (req,res) => {
    res.json({
        message: "sign in user"
    })
})

adminRouter.post("/course", (req,res) => {
    res.json({
        message: "create a course"
    })
})

adminRouter.put("/course", (req,res) => {
    res.json({
        message: "update the course"
    })
})

adminRouter.get("/course/bulk", (req,res) => {
    res.json({
        message: "get all the course"
    })
})


module.exports = {
    adminRouter: adminRouter
};












module.exports = {
    adminRouter : adminRouter
};
