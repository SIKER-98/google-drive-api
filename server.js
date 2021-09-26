const express = require('express')
const {json, urlencoded} = require('body-parser')
const cors = require('cors')

const folderRoutes = require('./routes/folderRoute')
const fileRoutes = require('./routes/fileRoute')
const driveRoutes = require('./routes/driveRoute')

const server = express()
server.use(cors())
server.use(json())
server.use(urlencoded({extended: true}))

server.use('/folders', folderRoutes)
server.use('/gdrive', driveRoutes)
server.use('/file', fileRoutes)

server.listen(8000, () => console.log('Server started'))

