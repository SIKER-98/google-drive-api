const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')

exports.folderMove = async (drive, data) => {
    const {folderId, newParentId, oldParentId} = data
    return await drive.files.update({
        fileId: folderId,
        addParents: newParentId,
        removeParents: [oldParentId]
    })
        .then(res => {
            console.log(new Date().toJSON(), 'folderMove', folderId, oldParentId, newParentId)
            return {
                status: responseTypes.NoContent
            }
        })
        .catch(e => {
            console.log(new Date().toJSON(), 'folderMove FAILED', folderId, oldParentId, newParentId)
            return {
                status: responseTypes.NotFound
            }
        })
}
