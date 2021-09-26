const {google} = require('googleapis');
const path = require('path')
const fs = require('fs')
const os = require('os');
const uuid = require('uuid');


const CLIENT_ID = '640338276132-cehv067221kfn5s3a47h59g43o7dbsga.apps.googleusercontent.com'
const CLIENT_SECRET = 'KDcIjZ5kg7Yto2S-GSO70LSx'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04E7aJR6__BMcCgYIARAAGAQSNwF-L9IrOIPt9WZ4urxAXDWI3eGwlqPcwGuwsrkOsY6RBPgJEgNQ1uZlIATq1gcA-iaKJhB4QFI'

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'razer.png')

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'razerUpload.png',
                mimeType: 'image/png',
            },
            media: {
                mimeType: 'image/png',
                body: fs.createReadStream(filePath)
            }
        })
        console.log(response.data)
    } catch (error) {
        console.log(error.message)
    }
}

async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: '12ePDuYHud-zGZjkRlacAOK6fCYRwQNAE'
        })
        console.log(response.data, response.status)
    } catch (error) {
        console.log(error.message)
    }
}

async function generatePublicUrl() {
    try {
        const fileId = '1ZXXe2taZpq2fHHXCpNvC-Nd2jXWz04RV'
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        })

        console.log(result.data)
    } catch (error) {
        console.log(error.message)
    }
}

async function listFolders() {
    await drive.files.list({
        pageSize: 1000,
        q: "mimeType='application/vnd.google-apps.folder'",
        fields: 'files(id, name, parents, createdTime, mimeType), nextPageToken',
        // fields: 'nextPageToken, files(id, name)'
    }, (err, res) => {
        if (err) console.log(err.message)

        const files = res.data.files

        console.log(files)
    })
}

async function listAll() {
    await drive.files.list({
        pageSize: 1000,
        // q: "mimeType='application/vnd.google-apps.folder'",
        fields: 'files(id, name, parents, createdTime, mimeType), nextPageToken',
        // fields: 'nextPageToken, files(id, name)'
    }, (err, res) => {
        if (err) console.log(err.message)

        const files = res.data.files

        console.log(files)
    })
}


async function createTextFile() {
    const res = await drive.files.create({
        requestBody: {
            name: 'TestFile',
            mimeType: 'text/plain'
        },
        media: {
            mimeType: 'text/plain',
            body: 'Text pliku tekstowego'
        }
    })

    console.log(res)
}

async function getFile() {
    const res = await drive.files.get({
        folderId: '1rFJ1j1UTPE33CvgtB5OvQ4THlFUZzkZl',
        alt: 'media'
    }, {responseType: 'stream'})
        .then(res => {
            return new Promise((resolve, reject) => {
                const FilePatch = path.join(os.tmpdir(), uuid.v4())
                console.log(`Writing to ${filePath}`)
                const dest = fs.createWriteStream(filePath)
                let progress = 0

                res.data
                    .on('end', () => {
                        console.log('Done downloading file.')
                        resolve(filePath)
                    })
                    .on('error', err => {
                        console.error('Error downloading file.')
                        reject(err)
                    })
                    .on('data', d => {
                        progress += d.length
                        if (process.stdout.isTTY) {
                            process.stdout.clearLine()
                            process.stdout.cursorTo(0)
                            process.stdout.write(`Downloaded ${progress} bytes`)
                        }
                    })
                    .pipe(dest)
            })
        })

    // console.log(res)
}

function getChildren(id) {
    return new Promise((resolve, reject) => {
        drive.files.list({q: `'${id}' in parents`},
            (err, data) => {
            if (err) return reject(err)
            console.log('your files', data.data)
            resolve(data)
        })
    })
}

// uploadFile()
// deleteFile()
// generatePublicUrl()
// listFolders()
// createFile()
// getFile()
// getFolderChildren()
getChildren('1rFJ1j1UTPE33CvgtB5OvQ4THlFUZzkZl')
