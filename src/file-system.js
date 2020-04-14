const fs = require("fs");
const rimraf = require("rimraf");

const existsSync = (path) => fs.existsSync(path);

const removeDirectory = (path) =>
  new Promise((resolve) => {
    rimraf(path, resolve);
  });

const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });

const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

module.exports = {
  existsSync,
  removeDirectory,
  readFile,
  writeFile,
};
