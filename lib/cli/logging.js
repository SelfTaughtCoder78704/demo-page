const chalk = require('chalk')

const successLog = (string) => console.log(chalk.green.bold(string))
const warningLog = (string) => console.log(chalk.yellow.bold(string))
const errorLog = (string) => console.log(chalk.red.bold(string))

const neutralLog = (string) => console.log(chalk.blue.bold(string))

const addFileLog = (string) => console.log(chalk.green(`+ ${string}`))
const removeFileLog = (string) => console.log(chalk.red(`- ${string}`))

const newLineLog = () => console.log('')

module.exports = {
  successLog,
  warningLog,
  errorLog,
  neutralLog,
  addFileLog,
  removeFileLog,
  newLineLog,
}
