const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
// const drive = require('../../config/gdriveInstance')

// instancja googleDrive oraz ID folderu, który ma być usunięty
exports.folderDelete = async (drive, data) => {
    const {folderId} = data
    return await drive.files.delete({
        fileId: folderId
    })
        .then(res => {
            console.log(new Date().toJSON(), 'folderDelete', folderId)
            return {
                status: responseTypes.NoContent
            }
        })
        .catch(e => {
            console.log(new Date().toJSON(), 'folderDelete FAILED', folderId)
            return {
                status: responseTypes.NotFound
            }
        })
}
