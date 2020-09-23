app.use('/api/test', (req, res, next) => {
    console.log('Middleware 1')
    next()
}, (req, res, next) => {
    console.log('Middleware 2')
    next()
}, (req, res, next) => {
    console.log('Middleware 3')
    next()
    // res.json({ status: "Successful" })
})

app.use('/api/test', [(req, res, next) => {
    console.log('Middleware 4')
    next()
}, (req, res, next) => {
    console.log('Middleware 5')
    next()
}, (req, res, next) => {
    console.log('Middleware 6')
    res.json({ status: "Successful" })
}])