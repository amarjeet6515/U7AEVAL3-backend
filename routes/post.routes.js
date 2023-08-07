const express = require("express");

const {Admodel}= require("../models/Post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    const query = req.query
    const posts = await Admodel.find(query)
    res.status(200).send(posts)
})

postRouter.post("/post", async (req, res) => {
    const ad = req.body

    const ad1 = new Admodel(ad)
    await ad1.save();
    res.status(201).send({ "msg": "New Ad Added" })
})


postRouter.delete("/delete/:_id", async (req, res) => {
    const { _id } = req.params
    const ad = await PostModel.findOne({ _id: _id })

        await PostModel.findOneAndDelete({ _id: _id })
        res.status(200).send("Deleted Successfully")

})



module.exports = {postRouter}