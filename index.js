#!/usr/bin/env node

const program = require('commander');
const package = require('./package.json');
const constants = require('./constants');
const inputs = require('./inputs');
const generate = require('./generate');
const {
  cloneRepo,
  removeTempFolder,
  copyFilesFromGithubRepo,
} = require('./helpers');

program.version(package.version);

program
  .command('gen')
  .option('-l, --lang [lang]', 'Set <JS> or <GO> as the programming language')
  .option(
    '--js_out [js_out]',
    'Set the output param of protoc. See more: https://github.com/protocolbuffers/protobuf/tree/master/js'
  )
  .option(
    '--go_out [go_out]',
    'Set the output param of protoc. See more: https://github.com/protocolbuffers/protobuf/tree/master/js'
  )
  .description('This command will generate a output files in .proto')
  .action(async (data) => {
    if (
      !Object.values(constants.supportedLanguageOutput).includes(
        data.lang?.toUpperCase()
      )
    ) {
      data.lang = await inputs.request.lang();
    }

    try {
      const repository = inputs.validate.repository();
      const token = inputs.validate.token();

      await cloneRepo(repository, token);
      await generate({
        ...data,
        lang: data.lang?.toUpperCase(),
      });

      removeTempFolder();
    } catch (err) {
      console.error(err);
    }
  });

program
  .command('only-proto')
  .option('-d, --dir [dir]', 'Set directory to add a .proto files')
  .description('This command will get the .proto files from Github repository')
  .action(async (data) => {
    if (!data.dir) {
      data.dir = await inputs.request.outputDir();
    }

    try {
      const repository = inputs.validate.repository();
      const token = inputs.validate.token();

      await cloneRepo(repository, token);
      await copyFilesFromGithubRepo(data.dir);

      removeTempFolder();

      console.log('Success');
    } catch (err) {
      console.error(err);
    }
  });

program.parse(process.argv);
