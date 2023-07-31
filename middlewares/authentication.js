require('dotenv').config();

var jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token)
    if(!token){
        return res.send("Please Login First")
    }

    jwt.verify(token, process.env.MY_SECRET, function(err, decoded){
        const {userID} = decoded;
        console.log(userID);
       req.userID = userID;
        if(decoded) {
            next();

        } else {
            res.status(400).send("Login First");
        }
    })
}

module.exports = {authenticate}