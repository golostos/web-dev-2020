const express = require('express')
const app = express()
const port = 3000
const db = require('./db.json')
const fs = require('fs')

app.use(express.static('./client/'))
app.use('/api/*', express.json())

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
    db.push(req.body)
    fs.writeFile('./server/db.json', JSON.stringify(db, null, 2), () => {
        res.json({ status: "Successful" })
    })
})

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})