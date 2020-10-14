#!/usr/bin/env node

const shelljs = require('shelljs')
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')

const handleTitle = () => {
  console.log(chalk.green(
    figlet.textSync('Files creator', { font: '4Max', horizontalLayout: 'default', verticalLayout: 'default' })
  ))
}

const handleQuestions = () => {

  const questions = [
    {
      name: 'nameFile',
      type: 'input',
      message: 'What is your file going to be called? (without extension)'
    },
    {
      name: 'extensionFile',
      type: 'list',
      message: 'What is the file extension?',
      choices: [ '.rb', '.js', '.kt', '.java', '.ts', '.php'],
      filter: (value) => value.split('.')[1]
    }
  ]

  return inquirer.prompt(questions)

}

const handleCreateFile = (nameFile, extensionFile) => {

  const pathFile = `${process.cwd()}/${nameFile}.${extensionFile}`

  shelljs.touch(pathFile)

  return pathFile

}

const handleCreateFileSuccess = pathFile => console.log(chalk.white.bgGreen.bold(`created successfully! Directory: ${pathFile}`))

const start = async () => {

  handleTitle()

  const { nameFile, extensionFile } = await handleQuestions()

  const pathFile = handleCreateFile(nameFile, extensionFile)

  handleCreateFileSuccess(pathFile)

  console.log(nameFile, extensionFile, pathFile)

}

start()
