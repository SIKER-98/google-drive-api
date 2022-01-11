const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");
// const drive = require('../../config/gdriveInstance')

exports.fileSearch = async (drive, data) => {
    const {fileName} = data

    return await drive.files.list({
        q: `name contains '${fileName}'`,
        fields: ' files(id,name,parents,createdTime,mimeType,trashed, explicitlyTrashed,folderColorRgb,modifiedTime, size)',
    })
        .then(res => {
            const files = res.data.files
            Logger.logNormal(`fileSearch ${files.length}`)
            return {
                status: responseTypes.Ok,
                data: {files}
            }
        })
        .catch(e => {
            Logger.logError('fileSearch FAILED')
            return {
                status: responseTypes.NotFound,
                error: e,
                message: 'Problem with fileSearch'
            }
        })
}
