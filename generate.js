const util = require('util');
const exec = util.promisify(require('child_process').exec);
const constants = require('./constants');
const { getAllDirectories } = require('./helpers');

const PROTO_DEFAULT_OPTIONS = {
  JS: `--js_out=import_style=ImportEs6,library=grpc,binary:gen`,
  GO: `--go_out=plugins=grpc:.`,
};

/**
 *
 * @param {{lang: "JS" | "GO", js_out: string, go_out: string} data
 */
module.exports = async ({ lang, js_out, go_out }) => {
  const jsOutOption = js_out ? `--js_out=${js_out}` : undefined;
  const goOutOption = go_out ? `--go_out=${go_out}` : undefined;

  const paths = [constants.dir.temporaryFolder].concat(
    ...getAllDirectories(constants.dir.temporaryFolder)
  );

  switch (lang) {
    case constants.supportedLanguageOutput.JS:
      try {
        const options = [
          ...paths.map((dir) => `--proto_path=${dir}`),
          jsOutOption ?? PROTO_DEFAULT_OPTIONS.JS,
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
          goOutOption ?? PROTO_DEFAULT_OPTIONS.GO,
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
