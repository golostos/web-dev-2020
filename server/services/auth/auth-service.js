const jwt = require('jsonwebtoken')
const { secret } = require('@config/config')

function createToken(userFromDB) {
    const token = jwt.sign({ id: userFromDB.id, role: userFromDB.role }, secret, 
        { expiresIn: 86400 })
    return token
}

function verifyToken(req, res, next) {
    if (req.headers['Authorization'] && req.headers['Authorization'].length) {
        const token = req.headers['Authorization'].replace(/(bearer|jwt)\s+/, '')
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return next({ message: "Failed to authenticate token", statusCode: 401 })
            }
            req.credentials = {id: decodedToken.id, role: decodedToken.role}
            next()
        })
    } else {
        req.credentials = { role: "guest" }
        next()
    }
}

module.exports = {
    createToken,
    verifyToken
}