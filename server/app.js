require('module-alias/register')

const express = require('express')
const app = express()
const port = 3000
const db = require('./db.json')
const fs = require('fs')

const { check, validationResult, checkSchema, body } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const Task = require('@models/Task')
let taskReady = false
Task.sync().then(() => {
    taskReady = true
})

app.use(express.static('./client/'))
app.use('/api/*', express.json())

app.post('/api/users', [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({min: 5}).withMessage('Must be at least 5 chars long')
        .matches(/\d/).withMessage('Must contain a number')
    ], 
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }
        res.json(req.body)
    }
)

app.get('/api/tasks/:userId', (req, res, next) => {
    // res.json(db)
    if (parseInt(req.params.userId) === 25) {
        next()
    } else res.json({error: 'Permition denied'})
}, (req, res, next) => {
    res.json(db)
})

app.get('/api/tasks/:id', (req, res, next) => {
    res.json(db[req.params.id])
})

app.post('/api/tasks', (req, res, next) => {
    // db.push(req.body)
    // fs.writeFile('./server/db.json', JSON.stringify(db, null, 2), () => {
    //     res.json({ status: "Successful" })
    // })
    if (taskReady) createNewTask(req, res)
})

function createNewTask(req, res) {
    Task.create(req.body).then(result => {
        console.log(result)
        res.status(201)
        res.json({message: "Successful"})
    }).catch(error => {
        console.error(error)
        res.status(500)
        res.json({message: "Error"})
    })
}

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})