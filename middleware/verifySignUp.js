const db = require("../models");
const User = db.user;
const {Logger} = require("../services/Logger");

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            Logger.logError('Something wend wrong!')
            res.status(500).send({message: err})
            return
        }

        if (user) {
            Logger.logError('Username already in use!')
            res.status(400).send({message: 'Failed! Username is already in use!'})
            return
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({message: err})
                return
            }

            if (user) {
                Logger.logError('Email already in use!')
                res.status(400).send({message: 'Failed! Email is already in use!'})
                return
            }

            next()
        })
    })
}


const verifySignUp = {
    checkDuplicateUsernameOrEmail,
}

module.exports = verifySignUp
