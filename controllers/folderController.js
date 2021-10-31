// const drive = require('../config/gdriveInstance')

const fileTypes = require('../consts/fileTypes')
const responseTypes = require("../consts/responseTypes");
const {folderShare} = require("../services/folderServices/folderShare");
const {folderMove} = require("../services/folderServices/folderMove");
const {folderChangeColor} = require("../services/folderServices/folderChangeColor");
const {folderGetChildrens} = require("../services/folderServices/folderGetChildrens");
const {gDriveAuthorisation} = require("../services/gDriveAuthorisation");
const {folderCreate} = require("../services/folderServices/folderCreate");
const {folderRootId} = require("../services/folderServices/folderRootId");
const {folderDelete} = require("../services/folderServices/folderDelete");
const {folderChangeName} = require("../services/folderServices/folderChangeName");
const {folderGet} = require("../services/folderServices/folderGet");

// pobranie wszystkich folderow z danego dysku
exports.getFolders = async (req, res) => {
    try {
        const {gdrive} = req.params
        const response = await gDriveAuthorisation(gdrive, folderGet)
        return res.status(response.status).json({data: response.data})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with folderController-getFolders'
        })
    }
}

exports.updateFolderName = async (req, res) => {
    try {
        const {gdrive} = req.params
        const {newName, folderId} = req.body


        const response = await gDriveAuthorisation(gdrive, folderChangeName, {folderId, newName})

        // const response = await folderChangeName(folderId, newName)
        return res.status(response.status).json({})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with folderController-updateFolderName'
        })
    }
}

exports.changeFolderColor = async (req, res) => {
    try {
        const {gdrive} = req.params
        const {newColor, folderId} = req.body

        const response = await gDriveAuthorisation(gdrive, folderChangeColor, {folderId, newColor})
        return res.status(response.status).json({})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with folderController-changeFolderColor'
        })
    }
}

exports.updateFolderParent = async (req, res) => {
    try {
        const {gdrive} = req.params
        const {folderId, newParentId, oldParentId} = req.body

        const response = await gDriveAuthorisation(gdrive, folderMove, {folderId, newParentId, oldParentId})
        return res.status(response.status).json({})

    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with folderController-updateFolderParent'
        })
    }
}

// usuwanie folderu
// req.params -> {gdrive, folderId}
exports.deleteFolder = async (req, res) => {
    try {
        const {gdrive, folderId} = req.params

        const response = await gDriveAuthorisation(gdrive, folderDelete, {folderId})
        return res.status(response.status).json({})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with folderController-deleteFolder'
        })
    }
}

// pobieranie id katalogu domowego w dysku
exports.getFolderRootId = async (req, res) => {
    try {
        const {gdrive} = req.params

        const response = await gDriveAuthorisation(gdrive, folderRootId)
        return res.status(response.status).json({data: response.data})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with folderController-getFolderRootId'
        })
    }
}

//tworzenie nowego folderu
// req.params -> {gdrive}
// req.body -> {folderName, parents}
exports.createFolder = async (req, res) => {
    try {
        const {gdrive} = req.params
        const {folderName, parents} = req.body

        const response = await gDriveAuthorisation(gdrive, folderCreate, {folderName, parents})
        return res.status(response.status).json({data: response.data})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with folderController-createFolder'
        })
    }
}

exports.getFolderChildren = async (req, res) => {
    try {
        const {gdrive, folderId} = req.params

        const response = await gDriveAuthorisation(gdrive, folderGetChildrens, {folderId})
        return res.status(responseTypes.Ok).json({data: response.data})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with folderController-getFolderChildren'
        })
    }
}

exports.folderShare = async (req, res) => {
    try {
        const {gdrive} = req.params
        const {folderId, role} = req.body

        const response = await gDriveAuthorisation(gdrive, folderShare, {folderId, role})
        return res.status(responseTypes.Created).json({data: response.data})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with folderController-pullFolderShare'
        })
    }
}



