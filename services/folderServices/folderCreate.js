const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
// const drive = require('../../config/gdriveInstance')


// metoda tworzaca folder
exports.folderCreate = async (drive, data) => {
    const {folderName, parents} = data
    //TODO: parrent musi byc jeden
    return await drive.files.create({
        resource: {
            name: folderName,
            parents: parents,
            mimeType: fileTypes.FOLDER
        },
        fields: 'id'
    })
        .then(res => {
            const folderId = res.data.id
            console.log(new Date().toJSON(), 'folderCreate', folderId)
            return {
                status: responseTypes.Created,
                data: {folderId}
            }
        })
        .catch(e => {
            console.log(new Date().toJSON(), 'folderCreate FAILED', folderName)
            return {
                status: responseTypes.NotFound
            }
        })
}
