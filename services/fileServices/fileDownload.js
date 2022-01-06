const fileTypes = require('../../consts/fileTypes')
const responseTypes = require('../../consts/responseTypes')
const fs = require("fs");
const {Logger} = require("../Logger");

exports.fileDownload = async (drive, data) => {
    const {req, res, fileId, fileName} = data
    let progress = 0
    const destination = fs.createWriteStream(`./upload/${fileName}`)

    drive.files.get({fileId: fileId, alt: 'media',}, {responseType: 'stream'})
        .then((driveResponse) => {
            driveResponse.data
                .on('end', () => {
                    Logger.logInfo('Done downloading file ', fileId)
                    const file = `./upload/${fileName}`
                    return res.download(file, () => {
                        Logger.logInfo(`./upload/${fileName}`, 'deleted')
                        fs.unlinkSync(`./upload/${fileName}`)
                    })

                })
                .on('error', (err) => {
                    Logger.logError('Error downloading file.');
                    return res.status(responseTypes.InternalServerError).json({data: err})
                })
                .on('data', (d) => {
                    progress += d.length;
                    if (process.stdout.isTTY) {
                        process.stdout.clearLine();
                        process.stdout.cursorTo(0);
                        process.stdout.write(`Downloaded ${progress} bytes`);
                    }
                })
                .pipe(destination)
        })
        .catch((err) => {
            Logger.logError(err)
            return res.status(responseTypes.InternalServerError).json({data: err})
        });

}
