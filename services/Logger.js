const chalk = require('chalk')

class Logger {

     getDate() {
        let date = new Date().toJSON().replace('T', ' ').slice(0, 19)
        date += ' - '
        return date
    }

    logNormal = (message) => {
        console.log(chalk.white(this.getDate()+message))
    }


    logWarn = (message) => {
        console.log(chalk.yellow(this.getDate()+message))
    }


    logError = (message) => {
        console.log(chalk.red(this.getDate()+message))
    }


    logOk = (message) => {
        console.log(chalk.green(this.getDate()+message))
    }


    logInfo = (message) => {
        console.log(chalk.blue(this.getDate()+message))
    }
}

exports.Logger = new Logger()
