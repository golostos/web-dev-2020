const bcryptjs = require('bcryptjs')

async function createPasswordHash(password) {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(password, salt)
}

function createPasswordHashSync(password) {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hash(password, salt)
}

async function comparePassword(password, hash) {
    if (typeof password === 'string') return bcryptjs.compare(password, hash)
    else return false
}

module.exports = {
    createPasswordHash,
    createPasswordHashSync,
    comparePassword
}