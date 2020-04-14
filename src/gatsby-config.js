const { readFile, writeFile } = require("./file-system");

const replaceJsString = (data, property, newValue) =>
  data.replace(
    new RegExp(`${property}: \`.*\``, "g"),
    `${property}: \`${newValue}\``
  );

const clearGatsbyConfig = (name) =>
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

module.exports = {
  clearGatsbyConfig,
};
