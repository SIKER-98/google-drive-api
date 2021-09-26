const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')

exports.folderRootId = async (drive) => {
    return await drive.files.list({
        q: "'root' in parents",
        fields: ' files(parents)'
    })
        .then(res => {
            const rootId = res.data.files.length > 0 ? res.data.files[0].parents[0] : 'null'
            console.log(new Date().toJSON(), 'folderRootId', rootId)
            return {
                status: responseTypes.Ok,
                data: {rootId}
            }
        })
        .catch(e => {
            console.log(e.message)
            console.log(new Date().toJSON(), 'folderRootId FAILED')
            return {
                status: responseTypes.NotFound,
                error: e,
                message: 'Problem with folderRootId'
            }
        })
}
