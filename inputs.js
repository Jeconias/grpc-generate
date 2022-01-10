const inquirer = require('inquirer');
const constants = require('./constants');

const request = {
  lang: async () => {
    const { lang: selectedLang } = await inquirer.prompt([
      {
        type: 'list',
        name: 'lang',
        message: 'Select the output language to .proto files',
        default: 'GO',
        choices: ['GO', 'JS'],
      },
    ]);

    return selectedLang;
  },
  outputDir: async () => {
    const { outputDir } = await inquirer.prompt([
      {
        type: 'input',
        name: 'outputDir',
        message: 'Set the output directory to .proto the files',
        default: constants.dir.defaultOutput,
      },
    ]);

    return outputDir;
  },
};

module.exports = {
  request,
};
