const util = require('util');
const exec = util.promisify(require('child_process').exec);
const constants = require('./constants');
const { getAllDirectories } = require('./helpers');

const PROTO_DEFAULT_OPTIONS = {
  JS: [`--js_out=library=grpc,binary:.`],
  GO: [`--go_out=plugins=:.`],
};

/**
 *
 * @param {{lang: "JS" | "GO"} data
 */
module.exports = async ({ lang }) => {
  const paths = [constants.dir.temporaryFolder].concat(
    ...getAllDirectories(constants.dir.temporaryFolder)
  );

  switch (lang) {
    case constants.supportedLanguageOutput.JS:
      try {
        const options = [
          ...paths.map((dir) => `--proto_path=${dir}`),
          ...PROTO_DEFAULT_OPTIONS.JS,
        ].join(' ');

        await exec(
          `protoc ${options} ${constants.dir.temporaryFolder}/*.proto ${constants.dir.temporaryFolder}/**/*.proto`
        );
        console.log('Success');
      } catch (err) {
        console.log(err);
      }

      break;
    default:
      try {
        const options = [
          ...paths.map((dir) => `--proto_path=${dir}`),
          ...PROTO_DEFAULT_OPTIONS.GO,
        ].join(' ');

        await exec(
          `protoc ${options} ${constants.dir.temporaryFolder}/*.proto ${constants.dir.temporaryFolder}/**/*.proto`
        );
        console.log('Success');
      } catch (err) {
        console.log(err);
      }
      break;
  }
};
