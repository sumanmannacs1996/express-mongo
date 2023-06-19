const express = require('express')
const router = express.Router()
const { getGoal, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware');

/*
router.get('/', getGoal)

router.post('/', setGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)
*/
// sorter format combining same routes
router.route('/').get(protect, getGoal).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router