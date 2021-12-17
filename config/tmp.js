const fs = require("fs");
const readline = require("readline");
const {google} = require('googleapis');

const TOKEN_PATH = './config/gtoken.json'
const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly"


exports.authorizeGoogleDrive = (gdrive, callback) => {
    fs.readFile('./config/gdriveCredentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err)
        const {client_secret, client_id, redirect_uris} = JSON.parse(content)

        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris)

        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, gdrive, {}, callback)
            const readToken = JSON.parse(token)
            // console.log('readToken: ', readToken)

            if (!readToken[gdrive]) return getAccessToken(oAuth2Client, gdrive, readToken, callback)

            oAuth2Client.setCredentials(readToken[gdrive])
            callback(oAuth2Client)
        })
    })
}

function getAccessToken(oAuth2Client, gdrive, readToken, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.log('Error retrieving access token', err);
            oAuth2Client.setCredentials(token)
            // Store the token to disk for later program executions


            console.log('oldToken: ', readToken)
            readToken[gdrive] = token
            console.log('newToken: ', readToken)


            fs.writeFileSync(TOKEN_PATH, JSON.stringify(readToken), (err) => {
                if (err) return console.log(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}
