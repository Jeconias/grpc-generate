const { Command } = require('commander');
const {
  cloneRepo,
  removeTempFolder,
  copyFilesFromGithubRepo,
} = require('../helpers');
const inputs = require('../inputs');

/**
 *
 * @param {Command} program
 */
const onlyProto = function (program) {
  program
    .command('only-proto')
    .option('-d, --dir [dir]', 'Set directory to add a .proto files')
    .description(
      'This command will get the .proto files from Github repository'
    )
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
};

module.exports = onlyProto;
