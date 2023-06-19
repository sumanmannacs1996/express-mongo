const jwt = require('jsonwebtoken')
const asyncHandaler = require('express-async-handler')
const User = require('../models/UserModel')

const protect = asyncHandaler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify Token
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token

            req.user = await User.findById(decode.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not Autharized!")
        }
    }
    if (!token) {
        res.status(401)
        throw new Error("Not authorized, no token found!")
    }
})

module.exports = { protect }