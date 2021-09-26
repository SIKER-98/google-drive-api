const responseTypes = require('../../consts/responseTypes')
const fs = require("fs");
const util = require('util')

const readFile = util.promisify(fs.readFile)

exports.driveFetch = async () => {
    return await readFile('./config/gtoken.json')
        .then(data => {
            const drives = Object.keys(JSON.parse(data))
            console.log(new Date().toJSON(), 'driveFetch', drives.length)
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
