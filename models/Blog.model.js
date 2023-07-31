const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title :{ type: String, required: true },
    category : { type: String, required: true },
    author : { type: String },
    content :{ type: String, required: true },
    author_id: { type: String}
})

const Blogmodel = mongoose.model("blog", blogSchema)

module.exports = {Blogmodel}