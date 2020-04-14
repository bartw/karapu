#!/usr/bin/env node

const fs = require("fs");
const Git = require("nodegit");
const rimraf = require("rimraf");

console.log(process.argv);

if (!process.argv[2]) {
  console.log("please provide something");
  return;
}

const name = process.argv[2];

if (fs.existsSync(name)) {
  console.log(`${name} already exists`);
  return;
}

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

const eraseHistory = () => removeDirectory(".git");

const replaceJsString = (data, property, newValue) =>
  data.replace(
    new RegExp(`${property}: \`.*\``, "g"),
    `${property}: \`${newValue}\``
  );

const clearPackage = () =>
  readFile("package.json")
    .then((packageData) => {
      const { repository, bugs, ...package } = JSON.parse(packageData);
      return JSON.stringify(
        {
          ...package,
          name,
          description: "",
          keywords: [],
          author: "",
        },
        null,
        2
      );
    })
    .then((packageData) => writeFile("package.json", packageData));

const clearGatsbyConfig = () =>
  readFile("gatsby-config.js")
    .then((gatsbyConfigData) => {
      const dataWithUpdatedTitle = replaceJsString(
        gatsbyConfigData,
        "title",
        name
      );
      const dataWithUpdatedDescription = replaceJsString(
        dataWithUpdatedTitle,
        "description",
        ""
      );
      const dataWithUpdatedShortName = replaceJsString(
        dataWithUpdatedDescription,
        "short_name",
        name
      );
      return dataWithUpdatedShortName;
    })
    .then((gatsbyConfigData) =>
      writeFile("gatsby-config.js", gatsbyConfigData)
    );

Git.Clone("https://github.com/bartw/gatsby-tailwind-starter", name)
  .then(() => {
    process.chdir(name);
  })
  .then(eraseHistory)
  .then(clearPackage)
  .then(clearGatsbyConfig)
  .catch((error) => {
    console.log(error);
  });
