const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");

exports.folderShare = async (drive, data) => {
    const {folderId, role} = data

    if (role === 'private')
        return await drive.permissions.delete({
            fileId: folderId,
            permissionId: 'anyoneWithLink'
        })
            .then(res => {
                Logger.logOk(`permission DELETED ${folderId}`)
                return {
                    status: responseTypes.NoContent,
                }
            })
            .catch(e => {
                Logger.logError(`permission DELETED FAILED ${folderId}`)
                return {
                    status: responseTypes.InternalServerError
                }
            })
    else
        return await drive.permissions.create({
            fileId: folderId,
            requestBody: {
                role: role,
                type: 'anyone'
            }
        })
            .then(async res => {
                Logger.logInfo(`permission CREATED ${folderId}, ${role}`)
                return await drive.files.get({
                    fileId: folderId,
                    fields: 'webContentLink, webViewLink'
                    // fields: '*'
                })
                    .then(res => {
                        Logger.logOk(`publicLink GENERATED ${folderId}`)
                        // console.log(res.data)
                        return {
                            status: responseTypes.Ok,
                            data: res.data
                        }
                    })
                    .catch(e => {
                        Logger.logError(`publicLink FAILED ${folderId}`)
                        return {
                            status: responseTypes.InternalServerError
                        }
                    })
            })
            .catch(e => {
                Logger.logError(`permission FAILED ${folderId}`)
                console.log(e)
                return {
                    status: responseTypes.InternalServerError
                }
            })
}
