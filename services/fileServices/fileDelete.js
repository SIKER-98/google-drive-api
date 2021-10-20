const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");

exports.fileDelete = async (drive, data) => {
    const {fileId} = data
    return await drive.files.delete({
        fileId: fileId
    })
        .then(res => {
            Logger.logWarn(`fileDelete ${fileId}`)
            return {
                status: responseTypes.NoContent
            }
        })
        .catch(e => {
            Logger.logError(`fileDelete ${fileId} FAILED`)
            return {
                status: responseTypes.NotFound
            }
        })
}
