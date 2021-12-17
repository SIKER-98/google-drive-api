const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const RefreshToken = require("../models/refreshToken.model");
const {Logger} = require("../services/Logger");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            Logger.logError('Something went wrong SignUp')
            res.status(500).send({message: err});
            return;
        }

        user.save(err => {
            if (err) {
                Logger.logError('Something went wrong SignUp-save')
                res.status(500).send({message: err})
                return
            }

            Logger.logOk('User was registered succesfully: ', user.username)
            res.send({message: "User was registered succesfully!"})
        })
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username,
    })
        .exec(async (err, user) => {
            if (err) {
                Logger.logError('Something went wrong SignIn')
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                Logger.logError('User Not found')
                return res.status(404).send({message: "User Not found."});
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                Logger.logError('Invalid Password!')
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }

            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: config.jwtExpiration,
            });

            let refreshToken = await RefreshToken.createToken(user);

            Logger.logOk('Token created!')
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                accessToken: token,
                refreshToken: refreshToken,
            });
        });
};

exports.refreshToken = async (req, res) => {
    const {refreshToken: requestToken} = req.body;

    if (requestToken == null) {
        Logger.logError('Refresh Token is required!')
        return res.status(403).json({message: "Refresh Token is required!"});
    }

    try {
        let refreshToken = await RefreshToken.findOne({token: requestToken});

        if (!refreshToken) {
            Logger.logError('Refresh token is not in database!')
            res.status(403).json({message: "Refresh token is not in database!"});
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            await RefreshToken.findByIdAndRemove(refreshToken._id, {useFindAndModify: false}).exec();

            Logger.logError('efresh token was expired. Please make a new signin request!')
            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        let newAccessToken = jwt.sign({id: refreshToken.user._id}, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        Logger.logOk('Refreshed token!')
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        Logger.logOk('Error refresh token!')
        return res.status(500).send({message: err});
    }
};
