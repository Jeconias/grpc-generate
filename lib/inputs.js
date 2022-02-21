const inquirer = require('inquirer');
const constants = require('./constants');
const { readFile } = require('./helpers');

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
        message: 'Set the output directory to .proto files',
        default: constants.onlyProto.defaultOutput,
      },
    ]);

    return outputDir;
  },
};

const validate = {
  /**
   *
   * @returns string
   */
  repository: () => {
    const file = readFile(constants.dir.configFile);
    const repository = file.github.repo;

    if (!repository || !repository.startsWith('https://github.com'))
      throw new Error(
        `${constants.configFileName} has a github invalid repository.`
      );

    return repository;
  },
  /**
   *
   * @returns string
   */
  token: () => {
    const file = readFile(constants.dir.configFile);
    const isPrivate = file.github.isPrivate;
    const token = file.github.token;

    if ((!token || typeof token !== 'string') && isPrivate)
      throw new Error(
        `${constants.configFileName} has a github invalid token.`
      );

    return token;
  },
};

module.exports = {
  request,
  validate,
};
