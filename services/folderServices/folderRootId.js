const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");

exports.folderRootId = async (drive) => {
    return await drive.files.list({
        q: "'root' in parents",
        fields: ' files(parents)'
    })
        .then(res => {
            const rootId = res.data.files.length > 0 ? res.data.files[0].parents[0] : 'null'
            Logger.logOk(`folderRootId`)
            return {
                status: responseTypes.Ok,
                data: {rootId},
            }
        })
        .catch(e => {
            Logger.logError('folderRootId FAILED')
            console.log(e)
            return {
                status: responseTypes.NotFound,
                error: e,
                message: 'Problem with folderRootId'
            }
        })
}
