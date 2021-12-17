const express = require('express')
const {json, urlencoded} = require('body-parser')
const cors = require('cors')


const folderRoutes = require('./routes/folderRoute')
const fileRoutes = require('./routes/fileRoute')
const driveRoutes = require('./routes/driveRoute')
const gdriveRoutes = require('./routes/gdriveRoutes')
const {Logger} = require("./services/Logger");
const db = require('./models')
const dbConfig = require('./config/db.config')


const server = express()
server.use(cors())
server.use(json())
server.use(urlencoded({extended: true}))

db.mongoose
    .connect(`mongodb://127.0.0.1:27017/`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        Logger.logOk("Successfully connect to MongoDB.");
    })
    .catch(err => {
        Logger.logError("Connection error", err);
        process.exit();
    });

require('./routes/authRoute')(server);

// server.use('/folders', folderRoutes)
// server.use('/gdrive', driveRoutes)
server.use('/file', fileRoutes)

server.use('/gdrive', gdriveRoutes)

server.listen(8000, () => {
    Logger.logInfo('Sever started on port: 8000')
})

