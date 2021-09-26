const responseTypes = require('../../consts/responseTypes')
const fs = require("fs");
const util = require('util')

const readFile = util.promisify(fs.readFile)

exports.driveState = async (gdrive) => {
    return await readFile('./config/gtoken.json')
        .then(data => {
            const drives = Object.keys(JSON.parse(data))

            if (drives.findIndex(item => item === gdrive) >= 0) {
                console.log(new Date().toJSON(), 'driveState', gdrive, 'FOUND')
                return {
                    status: responseTypes.Ok
                }
            }

            console.log(new Date().toJSON(), 'driveState ', gdrive, 'NOT FOUND')
            return {
                status: responseTypes.NotFound
            }


            return {
                data: drives,
                status: responseTypes.Ok
            }
        })
        .catch(e => {
            console.log(new Date().toJSON(), 'driveFetch FAILED')
            return {
                status: responseTypes.InternalServerError
            }
        })
}
