const {Router} = require('express')
const folderOperations = require('../controllers/folderController')

const router = Router()


router.get('/:gdrive', folderOperations.getFolders)
router.get('/:gdrive/root', folderOperations.getFolderRootId)
router.post('/:gdrive', folderOperations.createFolder)
router.put('/:gdrive/folderName', folderOperations.updateFolderName)
router.put('/:gdrive/color', folderOperations.changeFolderColor)
router.get('/:gdrive/:folderId', folderOperations.getFolderChildren)
router.delete('/:gdrive/:folderId', folderOperations.deleteFolder)


router.use((req, res) => {
    res.status(404).json({
        message: 'Invalid endpoint'
    })
})


module.exports = router
