const asyncHandaler = require('express-async-handler')

const Goal = require('../models/GoalModel')
const User = require('../models/UserModel')

// @desc Get goals
// @route GET api/goals
// @access Private
const getGoal = asyncHandaler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.json(goals)
})

// @desc Set goal
// @route POST api/goals
// @access Private
const setGoal = asyncHandaler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.json(goal)
})

// @desc Update goal
// @route PUT api/goals/:id
// @access Private
const updateGoal = asyncHandaler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    // Check for user
    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    }

    // make sure the login user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized to modify this")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedGoal)
})

// @desc Delete goal
// @route DELET api/goals/:id
// @access Private
const deleteGoal = asyncHandaler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    // Check for user
    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    }

    // make sure the login user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized to modify this")
    }


    await goal.deleteOne()
    res.json({id: req.params.id})
})

module.exports = {
    getGoal, setGoal, updateGoal, deleteGoal
}