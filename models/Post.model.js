const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    name :{ type: String, required: true },
    description : { type: String, required: true },
    category : { type: String },
    image :{ type: String,},
    location: { type: String},
    postedAt: { type: String},
    price: { type: Number}
})

const Admodel = mongoose.model("post", postSchema)

module.exports = {Admodel}