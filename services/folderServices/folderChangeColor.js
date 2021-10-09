const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const {Logger} = require("../Logger");

exports.folderChangeColor = async (drive, data) => {
    const {folderId, newColor} = data

    return await drive.files.update({
        fileId: folderId,
        resource: {
            folderColorRgb: newColor
        }
    })
        .then(res => {
            Logger.logOk(`folderColorChanged ${folderId} ${newColor}`)
            // console.log(new Date().toJSON(), 'folderChangeColor', folderId, newColor)
            return {
                status: responseTypes.NoContent
            }
        })
        .catch(e => {
            Logger.logError(`folderChangeColor ${folderId} FAILED`)
            // console.log(new Date().toJSON(), 'folderChangeColor FAILED', folderId, newColor)
            return {
                status: responseTypes.NotFound
            }
        })
}
