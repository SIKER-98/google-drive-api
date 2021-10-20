const chalk = require('chalk')

class Logger {

     getDate() {
        let date = new Date().toJSON().replace('T', ' ').slice(0, 19)
        date += ' - '
        return date
    }

    logNormal = (...message) => {
        console.log(chalk.white(this.getDate()+message.join(' ')))
    }


    logWarn = (...message) => {
        console.log(chalk.yellow(this.getDate()+message.join(' ')))
    }


    logError = (...message) => {
        console.log(chalk.red(this.getDate()+message.join(' ')))
    }


    logOk = (...message) => {
        console.log(chalk.green(this.getDate()+message.join(' ')))
    }


    logInfo = (...message) => {
        console.log(chalk.blue(this.getDate()+message.join(' ')))
    }

    logTest = (...message)=>{
        console.log(chalk.gray(this.getDate()+message.join(' ')))
    }
}

exports.Logger = new Logger()
