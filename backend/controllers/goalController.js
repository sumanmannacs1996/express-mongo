const asyncHandaler = require('express-async-handler')

const Goal = require('../models/GoalModel')

// @desc Get goals
// @route GET api/goals
// @access Private
const getGoal = asyncHandaler(async (req, res) => {
    const goals = await Goal.find()
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
        text: req.body.text
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
    await goal.remove()
    res.json({id: req.params.id})
})

module.exports = {
    getGoal, setGoal, updateGoal, deleteGoal
}