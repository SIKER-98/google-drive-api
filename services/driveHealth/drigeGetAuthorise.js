const responseTypes = require('../../consts/responseTypes')
const fs = require("fs");
const util = require('util')
const {google} = require("googleapis");

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const TOKEN_PATH = './config/gtoken.json'

const SCOPES = "https://www.googleapis.com/auth/drive"

exports.driveGetAuthorise = async (gdrive, authCode) => {
    const oAuth2Client = await getOAuth2Client()
    if (oAuth2Client === null) {
        return {status: responseTypes.InternalServerError}
    }

    return await oAuth2Client.getToken(authCode)
        .then(res => {
            const token = res.tokens
            return readFile('./config/gtoken.json')
                .then(data => {
                    const readToken = JSON.parse(data)
                    readToken[gdrive] = null
                    readToken[gdrive] = token

                    return writeTokenToFile(readToken, gdrive)
                })
                .catch(e => {
                    console.log(new Date().toJSON(), 'driveGetAuthorise', 'ERROR read existing tokens')
                    return {status: responseTypes.InternalServerError}
                })
        })
        .catch(e => {
            console.log(new Date().toJSON(), 'driveGetAuthorise', 'ERROR retrieving access token')
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

async function writeTokenToFile(token, gdrive) {
    console.log(token)
    return await writeFile(TOKEN_PATH, JSON.stringify(token))
        .then(data => {
            console.log(new Date().toJSON(), 'driveGetAuthorise', gdrive, TOKEN_PATH)
            return {status: responseTypes.Ok}
        })
        .catch(e => {
            console.log(new Date().toJSON(), 'driveGetAuthorise', 'ERROR creating new token file')
            return {status: responseTypes.InternalServerError}
        })
}
