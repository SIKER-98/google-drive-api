const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
// const drive = require('../../config/gdriveInstance')

exports.fileCreate = async (fileName, content, folderId) => {
    return await drive.files.create({
        resource: {
            name: fileName,
            parents: [folderId]
        },
        media: {
            mimeType: fileTypes.TEXT_FILE,
        },
        fields: 'id'
    })
        .then(res => {
            const fileId = res.data.id
            console.log(new Date().toJSON(), 'fileCreated', fileId)
            return {
                status: responseTypes.Created,
                data: {fileId}
            }
        })
        .catch(e => {
            console.log(new Date().toJSON(), 'fileCreated FAILED', fileName)
            return {
                status: responseTypes.NotFound
            }
        })
}
