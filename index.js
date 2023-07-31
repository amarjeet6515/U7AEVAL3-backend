const express = require('express');
const {userController} = require("./routes/user.routes")
const {connection} = require("./config/db")
const {authenticate} = require('./middlewares/authentication');

const { blogRouter } = require('./routes/blog.routes');
const cors = require('cors');
 
const app = express();
require('dotenv').config()
app.use(cors())

app.use(express.json())




app.use("/", userController);

// app.use(authenticate)

app.use("/blog",authenticate, blogRouter)

connection.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`listening on ${process.env.PORT}`);
    })
    console.log("connected to database")
})
