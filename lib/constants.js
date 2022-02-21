const path = require('path');

const DIR_ROOT = process.cwd();
const TEMPORARY_REPOSITORY_NAME = 'repo-pbs-temp';
const CONFIG_FILE_NAME = 'grpc.generate.config.json';
const SUPPORTED_LANGUAGE = {
  JS: 'JS',
  GO: 'GO',
};

module.exports = {
  dir: {
    root: DIR_ROOT,
    configFile: path.join(DIR_ROOT, CONFIG_FILE_NAME),
    temporaryFolder: path.join(DIR_ROOT, TEMPORARY_REPOSITORY_NAME),
  },
  onlyProto: {
    defaultOutput: 'proto',
  },
  supportedLanguageOutput: SUPPORTED_LANGUAGE,
  configFileName: CONFIG_FILE_NAME,
  temporaryRepositoryName: TEMPORARY_REPOSITORY_NAME,
};
