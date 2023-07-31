const express = require("express");

const {Blogmodel}= require("../models/Blog.model");
const { UserModel } = require("../models/User.model");

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
    const query = req.query
    const blogs = await Blogmodel.find(query)
    res.status(200).send(blogs)
})

blogRouter.post("/create", async (req, res) => {
    const { title,category, content } = req.body
    const author_id = req.userID;
    console.log(author_id,"created");
    const user = await UserModel.findOne({ _id: author_id })
    const author = user.name; 
    const blog = new Blogmodel({
        title,
        category,
        author,
        content,
        author_id
    })
    await blog.save();
    res.status(201).send({ "msg": "New Blog Added" })
})

blogRouter.put("/update/:_id", async (req, res) => {
    const { _id } = req.params
    const userID = req.userID
    const blog = await Blogmodel.findOne({ _id: _id })
    const author_id = blog.author_id

    if (author_id === userID) {
        const { title,category, content } = req.body
        try {
            const updatedblog = await Blogmodel.findByIdAndUpdate(_id, {
                title,
                category,
                content
            })

            if (!updatedblog) {
                res.status(404).send("No match found")
            } else {
                res.status(200).send("Blog Updated")
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        res.send("You are not Authorised")
    }

})

blogRouter.delete("/delete/:_id", async (req, res) => {
    const { _id } = req.params
    const userID = req.userID
    const todo = await Blogmodel.findOne({ _id: _id })
    const author_id = todo.author_id

    if (author_id === userID) {
        await Blogmodel.findOneAndDelete({ _id: _id })
        res.status(200).send("Deleted Successfully")
    } else {
        res.send("You are not Authorised")
    }

})



module.exports = {blogRouter}