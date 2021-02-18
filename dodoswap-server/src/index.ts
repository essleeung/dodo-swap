// Require needed packages
require('dotenv').config()
let cors = require('cors')
let expressJwt = require('express-jwt')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')
let bodyParser = require('body-parser')

import express, {Request, Response } from 'express'


// Instantiate app
let app = express()
let rowdyResults = rowdyLogger.begin(app)

// Set up middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false })) // Accept form data
app.use(bodyParser.json()) // Accept data from fetch (or any AJAX call)
app.use(cors()) //Add react app as origin for CORS

// Routes
app.use('/auth', require('./controllers/auth'))
app.use('/profile', expressJwt({secret: process.env.JWT_SECRET, algorithms: ['RS256', 'HS256']}), require('./controllers/profile'))
app.use('/catalogue', expressJwt({secret: process.env.JWT_SECRET, algorithms: ['RS256', 'HS256']}), require('./controllers/catalogue'))
app.use('/user', expressJwt({secret: process.env.JWT_SECRET, algorithms: ['RS256', 'HS256']}), require('./controllers/user'))
app.use('/event', expressJwt({secret: process.env.JWT_SECRET, algorithms: ['RS256', 'HS256']}), require('./controllers/event'))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from express! Things are dandy over here.')
})

app.get('*', (err: Error, req: Request, res: Response, next: any) => {
  res.status(404).send({ message: 'Not Found' })
  console.log("THIS IS BROKEN", err)
})



const port: number | string = process.env.PORT || 3000
app.listen(port, () => {
  rowdyResults.print()
})