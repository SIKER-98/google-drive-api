const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')

exports.folderGetChildrens = async (drive, data) => {
    const {folderId} = data

    return await drive.files.list({
        q: `'${folderId}' in parents`,
        fields: ' files(id,name,parents,createdTime,mimeType,trashed, explicitlyTrashed,folderColorRgb,modifiedTime)',
    })
        .then(res => {
            const fileList = res.data.files
            console.log(new Date().toJSON(), 'folderGetChildren', fileList.length)
            return {
                status:responseTypes.Ok,
                data:{fileList}
            }
        })
        .catch(e=>{
            console.log(new Date().toJSON(), 'folderGetChildren FAILED')
        })
}
