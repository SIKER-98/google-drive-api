const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");

exports.folderMove = async (drive, data) => {
    const {folderId, newParentId, oldParentId} = data
    return await drive.files.update({
        fileId: folderId,
        addParents: newParentId,
        removeParents: [oldParentId]
    })
        .then(res => {
            Logger.logOk(`folderMove ${folderId}`)
            return {
                status: responseTypes.NoContent
            }
        })
        .catch(e => {
            Logger.logError(`folderMove ${folderId} FAILED`)
            return {
                status: responseTypes.NotFound
            }
        })
}
