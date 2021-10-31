const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");

exports.filePublicUrl = async (drive, data) => {
    const {fileId} = data
    console.log(fileId)

    return await drive.permissions.create({
        fileId: fileId,
        requestBody: {
            role: 'reader',
            type: 'anyone'
        }
    })
        .then(async res => {
            Logger.logWarn(`permission CREATED ${fileId}`)
            return await drive.files.get({
                fileId: fileId,
                // fields: 'webContentLink, webViewLink'
                fields: '*'
            })
                .then(res => {
                    Logger.logOk(`publicLink GENERATED ${fileId}`)
                    console.log(res.data)
                    return {
                        status: responseTypes.Ok,
                        data: res.data
                    }
                })
                .catch(e => {
                    Logger.logError(`publicLink FAILED ${fileId}`)
                    return {
                        status: responseTypes.InternalServerError
                    }
                })
        })
        .catch(e => {
            Logger.logError(`permission FAILED ${fileId}`)
            console.log(e)
            return {
                status: responseTypes.InternalServerError
            }
        })


    const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink'
    })
    console.log(result.data)
}
