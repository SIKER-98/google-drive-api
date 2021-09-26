const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
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
            console.log(new Date().toJSON(), 'folderChangeName', folderId)
            return {
                status: responseTypes.NoContent
            }
        })
        .catch(e => {
            console.log(new Date().toJSON(), 'folderChangeName FAILED', folderId)
            return {
                status: responseTypes.NotFound
            }
        })
}
