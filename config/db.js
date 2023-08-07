const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.connect(`${process.env.MONGO_URL}U7AMOCK3`);

module.exports = {connection};