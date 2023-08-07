const express = require('express');
const { postRouter} = require("./routes/post.routes")
const {connection} = require("./config/db")

const cors = require('cors');
 
const app = express();
require('dotenv').config()
app.use(cors())

app.use(express.json())




app.use("/", postRouter);


connection.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`listening on ${process.env.PORT}`);
    })
    console.log("connected to database")
})
