#!/usr/bin/env node

const program = require('commander');
const package = require('./package.json');
const constants = require('./constants');
const inputs = require('./inputs');
const generate = require('./generate');
const { readFile, cloneRepo, removeTempFolder } = require('./helpers');

program.version(package.version);

program
  .command('generate')
  .option('-l, --lang [lang]', 'Set <JS> or <GO> as the programming language')
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
      const file = readFile(constants.dir.configFile);

      const isPrivate = file.github.isPrivate;
      const token = file.github.token;
      const repository = file.github.repo;

      if ((!token || typeof token !== 'string') && isPrivate)
        throw new Error(
          `${constants.configFileName} has a github invalid token.`
        );

      if (!repository || !repository.startsWith('https://github.com'))
        throw new Error(
          `${constants.configFileName} has a github invalid repository.`
        );

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

program.parse(process.argv);
