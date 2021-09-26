const responseTypes = require("../consts/responseTypes");
const {driveGetAuthorise} = require("../services/driveHealth/drigeGetAuthorise");
const {driveAuthorise} = require("../services/driveHealth/driveAuthorise");
const {driveState} = require("../services/driveHealth/driveState");
const {driveFetch} = require("../services/driveHealth/driveFetch");

exports.stateGoogleDrives = async (req, res) => {
    try {
        const gdrive = req.params.gdrive
        const response = await driveState(gdrive)
        return res.status(response.status).json({})

    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with driveController-stateGoogleDrives'
        })
    }
}

exports.getGoogleDrives = async (req, res) => {
    try {
        const response = await driveFetch()
        return res.status(response.status).json({data: response.data})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with driveController-getGoogleDrives'
        })
    }
}

exports.authoriseGoogleDrive = async (req, res) => {
    try {
        const gdrive = req.params.gdrive
        const response = await driveAuthorise(gdrive)

        return res.status(response.status).json({data: response.data})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with driveController-authoriseGoogleDrive'
        })
    }
}

exports.getAuthoriseGoogleDrive = async (req, res) => {
    try {
        const gdrive = req.params.gdrive
        const authCode = req.body.authCode
        const response = await driveGetAuthorise(gdrive, authCode)

        return res.status(response.status).json({})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with driveController-getAuthoriseGoogleDrive'
        })
    }
}
