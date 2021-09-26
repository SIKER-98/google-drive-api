const {Router} = require('express')
const driveOperations = require('../controllers/driveController')

const router = Router()

router.get('/', driveOperations.getGoogleDrives)
router.get('/:gdrive', driveOperations.stateGoogleDrives)
router.get('/:gdrive/authorise', driveOperations.authoriseGoogleDrive)
router.post('/:gdrive/authorise', driveOperations.getAuthoriseGoogleDrive)

router.use((req, res) => {
    res.status(404).json({
        message: 'Invalid endpoint'
    })
})
module.exports = router
