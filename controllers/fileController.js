const responseTypes = require("../consts/responseTypes");
const {fileCreate} = require("../services/fileServices/fileCreate");


exports.createFile = async (req, res) => {
    try {
        const fileName = req.body.fileName
        const content = req.body.content
        const folderId = req.params.folderId

        const response = await fileCreate(fileName, content, folderId)
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with fileController-createFile'
        })
    }
}
