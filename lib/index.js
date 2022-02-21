const program = require('commander');
const package = require('../package.json');

/**
 *
 * @returns {{program: program.Command}}
 */
const GRPCGenerate = function () {
  program.version(package.version);

  return {
    program,
  };
};

module.exports = GRPCGenerate;
