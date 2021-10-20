const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");

exports.fileChangeName = async (drive, data) => {
    const {fileId, newName} = data

    return await drive.files.update({
        fileId: fileId,
        resource: {
            name: newName
        }
    })
        .then(res => {
            Logger.logOk(`folderChangeName ${fileId}`)
            return {
                status: responseTypes.NoContent
            }
        })
        .catch(e => {
            Logger.logError(`fileChangeName ${fileId} FAILED`)
            return {
                status: responseTypes.NotFound
            }
        })

}
