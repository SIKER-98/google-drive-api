const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");
const multer = require('multer')
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage}).single('file')

exports.fileUpload = async (drive, data) => {
    const {req, res, folderId} = data

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(responseTypes.InternalServerError).json({data: err})
        } else if (err) {
            return res.status(responseTypes.InternalServerError).json({data: err})
        }

        return drive.files.create({
            resource: {
                name: req.file.originalname,
                parents: [folderId],
                // mimeType: req.file.mimeType,
            },
            media: {
                mimeType: req.file.mimeType,
                body: fs.createReadStream(`upload/${req.file.originalname}`)
            },
            fields: 'id'
        })
            .then(r => {
                fs.unlinkSync(`upload/${req.file.originalname}`)
                const fileId = r.data.id
                Logger.logOk(`file uploaded ${fileId}`)
                return res.status(responseTypes.Created).json({data: fileId})
            })
            .catch(e => {
                fs.unlinkSync(`upload/${req.file.originalname}`)
                Logger.logError(`file uploaded FAILED`, e)
                return res.status(responseTypes.InternalServerError).json({data: e})
            })
    })
}


