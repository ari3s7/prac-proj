const express = require("express");
const app = express();
const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const { z } = require("zod")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { JWT_USER_PASSWORD } = require("../config")
const { userMiddleware } = require("../middleware/user");

app.use(express.json());

const userRouter = Router();

userRouter.post("/signup", async (req,res) => {

    const userValid = z.object({
        email: z.string(),
        password: z.string().min(3).max(10),
        firstName: z.string().min(2).max(10),
        lastName: z.string().min(2).max(10)
    }) 

    const parsedData = userValid.safeParse(req.body);

    if(!parsedData.success) {
        res.json({
            message: "not correct format"
        }) 
        return
    } 

    const {
        email,
        password,
        firstName,
        lastName
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
      await userModel.create ({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
      });

      res.status(200).json({
        message: "successfully created the user"
      })
    }
    catch (err) {
      console.error("error creating user", err);

      res.status(500).json ({
        message: "something went wrong"
      })
    }
})

userRouter.post("/signin", async (req,res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne ({
        email: email
    });
    if (!user) {
    return res.status(404).json({ message: "User not found" });
} 

    const passMatch = await bcrypt.compare(password, user.password)

    if (passMatch) {
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD);

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "wrong credentials"
        })
    }
})

module.exports = {
    userRouter: userRouter
};


















module.exports = {
    userRouter: userRouter
}