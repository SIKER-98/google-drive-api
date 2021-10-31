const {Router} = require('express')
const folderOperations = require('../controllers/folderController')
const fileOperations = require('../controllers/fileController')
const driveOperations = require("../controllers/driveController");

const router = Router()

//
// DRIVE

// pobranie wszystkich autoryzowanych dyskow
router.get('/', driveOperations.getGoogleDrives)

// sprawdzenie czy dany dysk jest dodany
// router.get('/:gdrive', driveOperations.stateGoogleDrives)

// pobranie linku do autoryzacji
router.get('/:gdrive/authorise', driveOperations.authoriseGoogleDrive)

// zautoryzowanie dysku
router.post('/:gdrive/authorise', driveOperations.getAuthoriseGoogleDrive)

//
// FOLDERS

// pobranie folderow
router.get('/:gdrive/folder', folderOperations.getFolders)

// pobranie id folderu glownego
router.get('/:gdrive/folder/root', folderOperations.getFolderRootId)

// stworzenie folderu
router.post('/:gdrive/folder', folderOperations.createFolder)

// zmiana nazwy folderu
router.put('/:gdrive/folder/folderName', folderOperations.updateFolderName)

// zmiana koloru folderu
router.put('/:gdrive/folder/color', folderOperations.changeFolderColor)

// przeniesienie folderu
router.put('/:gdrive/folder/parent', folderOperations.updateFolderParent)

// pobranie zawartosci folderu
router.get('/:gdrive/folder/:folderId', folderOperations.getFolderChildren)

// usuniecie folderu
router.delete('/:gdrive/folder/:folderId', folderOperations.deleteFolder)

// udostepnianie
router.put('/:gdrive/folder/share', folderOperations.folderShare)

//
// FILE

// zmiana nazwy pliku
router.put('/:gdrive/file/fileName', fileOperations.updateFileName)

// stworzenie pliku
router.post('/:gdrive/file', fileOperations.createFile)

// usuniecie pliku
router.delete('/:gdrive/file/:fileId', fileOperations.deleteFile)

// przeniesienie pliku
router.put('/:gdrive/file/parent', fileOperations.moveFile)

// pobranie linkow
router.get('/:gdrive/file/publicURL/:fileId', fileOperations.getFilePublicURL)


router.use((req, res) => {
    res.status(404).json({
        message: 'Invalid endpoint'
    })
})


module.exports = router
