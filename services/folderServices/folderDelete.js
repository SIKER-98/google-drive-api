const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");
// const drive = require('../../config/gdriveInstance')

// instancja googleDrive oraz ID folderu, który ma być usunięty
exports.folderDelete = async (drive, data) => {
    const {folderId} = data
    return await drive.files.delete({
        fileId: folderId
    })
        .then(res => {
            Logger.logWarn(`folderDelete ${folderId}`)
            return {
                status: responseTypes.NoContent
            }
        })
        .catch(e => {
            Logger.logError(`folderDelete ${folderId} FAILED`)
            return {
                status: responseTypes.NotFound
            }
        })
}
