const responseTypes = require('../consts/responseTypes')
const fs = require("fs");
const util = require("util");
const {google} = require("googleapis");

const readFile = util.promisify(fs.readFile)
const TOKEN_PATH = './config/gtoken.json'

exports.gDriveAuthorisation = async (gdrive, callback, data) => {
    const oAuth2Client = await getOAuth2Client()

    if (oAuth2Client === null) {
        return {status: responseTypes.InternalServerError}
    }

    return await readFile(TOKEN_PATH)
        .then(async res => {
            const token = JSON.parse(res)
            // console.log('readToken: ', token)

            if (!token[gdrive]) return {status: responseTypes.Unauthorized}

            oAuth2Client.setCredentials(token[gdrive])
            const drive = google.drive({version: 'v3', auth: oAuth2Client})
            return await callback(drive, data)
        })
        .catch(e => {
            return {status: responseTypes.InternalServerError}
        })
}

async function getOAuth2Client() {
    return await readFile('./config/gdriveCredentials.json')
        .then(data => {
                const {client_secret, client_id, redirect_uris} = JSON.parse(data)
                return new google.auth.OAuth2(client_id, client_secret, redirect_uris)
            }
        )
        .catch(e => {
            console.log(new Date().toJSON(), 'driveGetAuthorise', 'ERROR read credentials')
            return null
        })
}
