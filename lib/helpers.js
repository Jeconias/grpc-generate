const { resolve, join } = require('path');
const fs = require('fs');
const NodeGit = require('nodegit');
const constants = require('./constants');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 *
 * @param {string} path
 */
const readFile = (path) => {
  if (!fs.existsSync(path)) throw new Error(`File not exists: ${path}`);
  return JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
};

const removeTempFolder = () => {
  fs.rmSync(constants.dir.temporaryFolder, { recursive: true });
};

/**
 *
 * @param {string} repository
 * @param {string} token
 * @returns
 */

const cloneRepo = async (repository, token) =>
  NodeGit.Clone(repository, constants.dir.temporaryFolder, {
    fetchOpts: {
      callbacks: {
        certificateCheck: () => 1,
        credentials: () =>
          NodeGit.Cred.userpassPlaintextNew(token, 'x-oauth-basic'),
      },
    },
  });

/**
 *
 * @param {string} path
 * @return {string[]} directories
 */
const getAllDirectories = (path) => {
  const result = [];

  const folders = fs
    .readdirSync(path, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('.'))
    .map((dirent) => resolve(join(path, dirent.name)));

  result.push(...folders);

  for (let i = 0; i < folders.length; i++) {
    result.push(...getAllDirectories(folders[i]));
  }

  return result;
};

/**
 *
 * @param {string} outputDir
 */
const copyFilesFromGithubRepo = async (outputDir) => {
  return await exec(
    `cd ${
      constants.dir.temporaryFolder
    } && find -name '*.proto' | cpio -pdm ${join(
      constants.dir.root,
      outputDir
    )}`
  );
};

module.exports = {
  readFile,
  cloneRepo,
  removeTempFolder,
  getAllDirectories,
  copyFilesFromGithubRepo,
};
