const { Command } = require('commander');
const { cloneRepo, removeTempFolder } = require('../helpers');
const constants = require('../constants');
const inputs = require('../inputs');
const generate = require('../generate');

/**
 *
 * @param {Command} program
 */
const genCommand = function (program) {
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
};

module.exports = genCommand;
