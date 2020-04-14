const { existsSync } = require("./file-system");
const { clone, eraseHistory, createHistory } = require("./git");
const { clearPackage } = require("./package");
const { clearGatsbyConfig } = require("./gatsby-config");
const { replaceReadme } = require("./readme");

const name = process.argv[2] ? process.argv[2].trim() : null;

if (!name) {
  console.error("Please provide a name for your project");
  return;
}

if (existsSync(name)) {
  console.error(`A file or directory called "${name}" already exists`);
  return;
}

clone(name)
  .then(() => {
    process.chdir(name);
  })
  .then(eraseHistory)
  .then(() => clearPackage(name))
  .then(() => clearGatsbyConfig(name))
  .then(() => replaceReadme(name))
  .then(createHistory)
  .catch((error) => {
    console.error("Something went wrong", error);
  });
