const Git = require("nodegit");
const { removeDirectory } = require("./file-system");

const clone = (name) =>
  Git.Clone("https://github.com/bartw/gatsby-tailwind-starter", name);

const eraseHistory = () => removeDirectory(".git");

const createHistory = () => Git.Repository.init(".", 0);

module.exports = {
  clone,
  eraseHistory,
  createHistory,
};
