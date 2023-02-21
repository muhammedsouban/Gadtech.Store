const session = require('express-session')
require('dotenv').config()

const checkSession = session({
    secret : process.env.SECRET_KEY,
    resave :false,
    saveUninitialized:false,
    cookie :{
        expires :360000,
    },
})


module.exports = checkSession