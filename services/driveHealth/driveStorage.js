const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");

exports.driveStorage = async (drive, data) => {
    return await drive.drives.get({
        driveId: '0AKDB-V4TgcVwUk9PVA'
    })
        .then(res => {
            Logger.logOk('cos pobralo')
            return {
                drive: res.data,
                status: 205
            }
        })
        .catch(e => {
            Logger.logError(`driveStorage FAILED`)
            return {
                status: responseTypes.InternalServerError
            }
        })
}
