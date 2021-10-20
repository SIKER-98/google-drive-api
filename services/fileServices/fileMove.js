const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");

exports.fileMove = async (drive, data) => {
    const {fileId, newParentId, oldParentId} = data

    return await drive.files.update({
        fileId: fileId,
        addParents: newParentId,
        removeParents: [oldParentId]
    })
        .then(res => {
            Logger.logOk(`fileMove ${fileId}`)
            return {
                status: responseTypes.NoContent
            }
        })
        .catch(e => {
            Logger.logError(`fileMove ${fileId} FAILED`)
            return {
                status: responseTypes.NotFound
            }
        })

}
