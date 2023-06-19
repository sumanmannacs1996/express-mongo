const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandaler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

connectDB()
const app = express()

// adding post json middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

// adding error handaler middleware
app.use(errorHandaler)

app.listen(PORT, () => console.log(`Server stared on port ${PORT}`));