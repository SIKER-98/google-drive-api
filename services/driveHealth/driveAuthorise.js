const responseTypes = require('../../consts/responseTypes')
const fs = require("fs");
const util = require('util')
const {google} = require("googleapis");

const readFile = util.promisify(fs.readFile)
const TOKEN_PATH = './config/gtoken.json'
const SCOPES = "https://www.googleapis.com/auth/drive"


exports.driveAuthorise = async (gdrive) => {
    return await readFile('./config/gdriveCredentials.json')
        .then(data => {
            const {client_secret, client_id, redirect_uris} = JSON.parse(data)
            const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris)
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
                prompt: "consent"
            });
            return {
                status: responseTypes.Ok,
                data: authUrl
            }
        })
        .catch(e => {
            console.log(e.message)
            console.log(new Date().toJSON(), 'driveAuthorise', 'ERROR read credentials')
            return {
                status: responseTypes.InternalServerError,
                error: e.message
            }
        })
}




// exports.driveAuthorise = async (gdrive) => {
//     return await readFile('./config/gtoken.json')
//         .then(data => {
//             const drives = Object.keys(JSON.parse(data))
//             console.log(new Date().toJSON(), 'driveFetch', drives.length)
//             return {
//                 data: drives,
//                 status: responseTypes.Ok
//             }
//         })
//         .catch(e => {
//             console.log(new Date().toJSON(), 'driveFetch FAILED')
//             return {
//                 status: responseTypes.InternalServerError
//             }
//         })
// }
