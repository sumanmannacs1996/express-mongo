const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
const asyncHandaler = require('express-async-handler')


// @desc Register user
// @route POST api/user
// @access Public
const registerUser = asyncHandaler(async (req, res) => {
    const { name, email, password } = req.body

    // Check if all the required inputs are present 
    if (!(name && email && password)) {
        res.status(400)
        throw new Error("Please provide all the details like name, email, password")
    }

    // Check if user already exists
    const userExist = await User.findOne({ email })
    console.log(userExist);
    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    // Hash password 
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hasedPassword,
        token: genToken(user.id)
    })

    if (user) {
        res.status(201)
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: user.token
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Authenticate user
// @route POST api/user/login
// @access Public
const loginUser = asyncHandaler(async (req, res) => {
    const { email, password } = req.body

    //// Check if all the required inputs are present 
    if (!(email && password)) {
        res.status(400)
        throw new Error("Email and password required to authenticate")
    }
    const user = await User.findOne({ email })

    // Check if email and apssword is correct
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credential")
    }
})

// @desc get User Data
// @route GET api/user/me
// @access Private
const getMe = asyncHandaler(async (req, res) => {
    const { id, name, email } = await User.findById(req.user.id)
    res.json({
        id,
        name,
        email,
    })
})


// generate token
const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = { registerUser, loginUser, getMe }