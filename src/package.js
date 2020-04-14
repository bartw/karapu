const { readFile, writeFile } = require("./file-system");

const clearPackage = (name) =>
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

module.exports = {
  clearPackage,
};
