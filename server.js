const express = require('express')
const {json, urlencoded} = require('body-parser')
const cors = require('cors')

const folderRoutes = require('./routes/folderRoute')
const fileRoutes = require('./routes/fileRoute')
const driveRoutes = require('./routes/driveRoute')
const gdriveRoutes = require('./routes/gdriveRoutes')
const {Logger} = require("./services/Logger");


const server = express()
server.use(cors())
server.use(json())
server.use(urlencoded({extended: true}))

// server.use('/folders', folderRoutes)
// server.use('/gdrive', driveRoutes)
server.use('/file', fileRoutes)

server.use('/gdrive', gdriveRoutes)

server.listen(8000, () => {
    Logger.logInfo('Sever started on port: 8000')
})

