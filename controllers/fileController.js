const responseTypes = require("../consts/responseTypes");
const {filePublicUrl} = require("../services/fileServices/filePublicUrl");
const {fileDelete} = require("../services/fileServices/fileDelete");
const {fileMove} = require("../services/fileServices/fileMove");
const {fileChangeName} = require("../services/fileServices/fileChangeName");
const {gDriveAuthorisation} = require("../services/gDriveAuthorisation");
const {Logger} = require("../services/Logger");
const {fileCreate} = require("../services/fileServices/fileCreate");


exports.createFile = async (req, res) => {
    try {
        const {gdrive} = req.params
        const {fileName, content, folderId,} = req.body

        const response = await gDriveAuthorisation(gdrive, fileCreate, {fileName, content, folderId})
        return res.status(response.status).json({data: response.data})
    } catch (e) {
        Logger.logError('fileController-createFile')
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with fileController-createFile'
        })
    }
}

exports.updateFileName = async (req, res) => {
    try {
        const {gdrive} = req.params
        const {newName, fileId} = req.body

        const response = await gDriveAuthorisation(gdrive, fileChangeName, {newName, fileId})
        return res.status(response.status).json({})
    } catch (e) {
        Logger.logError('fileController-updateFileName')
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Poblem with folderController-updateFileName'
        })
    }
}

exports.deleteFile = async (req, res) => {
    try {
        const {gdrive, fileId} = req.params
        // const {fileId} = req.body

        const response = await gDriveAuthorisation(gdrive, fileDelete, {fileId})
        return res.status(response.status).json({})
    } catch (e) {
        Logger.logError('fileController-deleteFile')
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with fileController-deleteFile'
        })
    }
}

exports.moveFile = async (req, res) => {
    try {
        const {gdrive} = req.params
        const {fileId, oldParentId, newParentId} = req.body

        const response = await gDriveAuthorisation(gdrive, fileMove, {fileId, oldParentId, newParentId})
        return res.status(response.status).json({})
    } catch (e) {
        Logger.logError('fileController-moveFile')
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with fileController-moveFile'
        })
    }
}

exports.getFilePublicURL = async (req, res) => {
    try {
        const {gdrive,fileId} = req.params
        // const {fileId} = req.body

        const response = await gDriveAuthorisation(gdrive, filePublicUrl, {fileId})
        return res.status(response.status).json(response.data)
    } catch (e) {
        Logger.logError(`fileController-getFilePublicURL`)
        return res.status(responseTypes.InternalServerError).json({})
    }
}

