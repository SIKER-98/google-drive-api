const {Router} = require('express')
const fileOperations = require('../controllers/fileController')

const router = Router()

// router.get('/')
router.post('/', fileOperations.createFile)
// router.delete('/:fileId', fileOperations.deleteFile)


router.use((req, res) =>
    res.status(404).json({
        message: 'Invalid endpoint'
    })
)

module.exports = router
