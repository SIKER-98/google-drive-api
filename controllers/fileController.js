const responseTypes = require("../consts/responseTypes");
const {fileCreate} = require("../services/fileServices/fileCreate");


exports.createFile = async (req, res) => {
    try {
        const {gdrive} = req.params
        const {fileName, content, folderId,} = req.body


        const response = await fileCreate(fileName, content, folderId)
        return res.status(response.status).json({data: response.data})
    } catch (e) {
        return res.status(responseTypes.InternalServerError).json({
            error: e,
            message: 'Problem with fileController-createFile'
        })
    }
}
