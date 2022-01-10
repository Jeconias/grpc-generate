const path = require('path');

const DIR_BASE = __dirname;
const CONFIG_FILE_NAME = 'grpc.generate.config.json';
const TEMPORARY_REPOSITORY_NAME = 'repo-pbs-temp';
const SUPPORTED_LANGUAGE = {
  JS: 'JS',
  GO: 'GO',
};

module.exports = {
  dir: {
    defaultOutput: 'grpc',
    configFile: path.join(process.cwd(), CONFIG_FILE_NAME),
    temporaryFolder: path.join(DIR_BASE, TEMPORARY_REPOSITORY_NAME),
  },
  supportedLanguageOutput: SUPPORTED_LANGUAGE,
  configFileName: CONFIG_FILE_NAME,
  temporaryRepositoryName: TEMPORARY_REPOSITORY_NAME,
};
