const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");
// const drive = require('../../config/gdriveInstance')

exports.folderGet = async (drive) => {
    return await drive.files.list({
        q: `mimeType='${fileTypes.FOLDER}'`,
        fields: ' files(id,name,parents,createdTime,mimeType,trashed, explicitlyTrashed,folderColorRgb,modifiedTime)',
    })
        .then(res => {
            const files = res.data.files
            // console.log('getFolders:', res.data)
            Logger.logNormal(`folderGet ${files.length}`)
            // console.log(new Date().toJSON(), 'folderGet', files.length)
            return {
                status: responseTypes.Ok,
                data: {files}
            }
        })
        .catch(e => {
            Logger.logError('folderGet FAILED')
            // console.log(new Date().toJSON(), 'folderGet FAILED')
            return {
                status: responseTypes.NotFound,
                error: e,
                message: 'Problem with folderGet'
            }
        })
}
