const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");

exports.folderGetChildrens = async (drive, data) => {
    const {folderId} = data

    return await drive.files.list({
        q: `'${folderId}' in parents`,
        fields: ' files(id,name,parents,createdTime,mimeType,trashed, explicitlyTrashed,folderColorRgb,modifiedTime,size,folderColorRgb,permissions)',
    })
        .then(res => {
            const fileList = res.data.files
            Logger.logOk(`folderGetChildren ${fileList.length}`)
            // console.log(new Date().toJSON(), 'folderGetChildren', fileList.length)
            return {
                status: responseTypes.Ok,
                data: {fileList}
            }
        })
        .catch(e => {
            Logger.logError('folderGetChildren FAILED')
            // console.log(new Date().toJSON(), 'folderGetChildren FAILED')
            return {
                status: responseTypes.NotFound
            }
        })
}
