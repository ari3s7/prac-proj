const express = require("express");
const app = express();
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
app.use(express.json());

const PORT = 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);







app.listen(PORT)