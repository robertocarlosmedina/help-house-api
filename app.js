const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const user_routes = require('./routes/userAuth.js')
const bus_routes_routes  = require('./routes/servicesRoutes')

app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))

// ------------------------ End points -----------------------
app.use('/services', bus_routes_routes)
app.use('/user', user_routes)

module.exports = app
