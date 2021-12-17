const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const {Logger} = require("../services/Logger");
const User = db.user;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        Logger.logError('Unauthorized! Access Token was expired!')
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    Logger.logError('Unauthorized!')
    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        Logger.logWarn('No token provided')
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            Logger.logError('Unauthorized!')
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};


const authJwt = {
    verifyToken,
};
module.exports = authJwt;
