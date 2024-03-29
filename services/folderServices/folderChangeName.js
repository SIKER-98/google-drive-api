const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");
// const drive = require('../../config/gdriveInstance')

exports.folderChangeName = async (drive, data) => {
    const {folderId, newName} = data
    return await drive.files.update({
        fileId: folderId,
        resource: {
            name: newName
        },
    })
        .then(res => {
            Logger.logOk(`folderChangeName ${folderId}`)
            return {
                status: responseTypes.NoContent
            }
        })
        .catch(e => {
            Logger.logError(`folderChangeName ${folderId} FAILED`)
            return {
                status: responseTypes.NotFound
            }
        })
}
