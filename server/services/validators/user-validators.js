const { body } = require('express-validator/check')
const validator = require('validator')
const Ajv = require('ajv')
const ajv = new Ajv({removeAdditional: true})
const {profileScheme} = require('@config/config')
const validateProfile = ajv.compile(profileScheme)

const passwordValidationChain = (passwordFieldName) => {
    body(passwordFieldName).isString().withMessage('Must be a string').trim()
    .isLength({min: 5, max: 128}).withMessage('Must be at least 5 chars long')
    .matches(/\d/).withMessage('Must contain a number')
    .matches(/[a-zA-Z]/).withMessage('Must contain a letter')
}

const createUserValidator = [
    body('login').isString().withMessage('Must be a string').trim()
    .isLength({min: 3, max: 128}).withMessage('Must be at least 3 chars long')
    .matches(/^[a-zA-Z]\w+$/).withMessage('Must starts from english letter')
    .customSanitizer(login => login.toLocaleLowerCase()),
    passwordValidationChain('password'),
    body('email').isString().withMessage('Must be a string').trim()
    .isLength({max: 128}).isEmail().normalizeEmail()
]

const loginValidator = [
    body('loginOrEmail').isString().trim().custom((loginOrEmail, {req }) => {
        delete req.body.loginOrEmail
        if (loginOrEmail.length > 127) throw new Error('Invorrect user login or email')
        if (validator.isEmail(loginOrEmail)) {
            req.body.loginQuery = { email: validator.normalizeEmail(loginOrEmail) }
        } else if (loginOrEmail.length > 2) {
            req.body.loginQuery = { login: loginOrEmail.toLocaleLowerCase()}
        } else throw new Error('Incorrect user email or login')
        return true;
    }),
    passwordValidationChain('password')
]

const bodyFilter = (validator = [], ...allowedParams) => {
    const filter = (req, res, next) => {
        req.body = allowedParams.reduce((newBody, param) => {
            return req.body[param] ? ({...newBody, [param]: req.body[param]}) : newBody
        }, {})
        next()
    }
    return [filter, ...validator]
}

module.exports = {
    create: bodyFilter(createUserValidator, 'login', 'password', 'email'),
    login: bodyFilter(loginValidator, 'loginOrEmail', 'password')
}