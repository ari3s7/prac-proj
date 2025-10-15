const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signup", (req,res) => {
    res.json({
        message: "sign up user"
    })
})

userRouter.post("/signin", (req,res) => {
    res.json({
        message: "sign in user"
    })
})

module.exports = {
    userRouter: userRouter
};


















module.exports = {
    userRouter: userRouter
}