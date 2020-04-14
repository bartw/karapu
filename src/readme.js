const { writeFile } = require("./file-system");

const replaceReadme = (name) =>
  writeFile(
    "README.md",
    `# ${name}

This repo was initialized from https://github.com/bartw/gatsby-tailwind-starter using https://github.com/bartw/karapu.

## Quickstart

\`\`\`shell
npm install
npm start
\`\`\`

## License

This repo is licensed under the [MIT License](LICENSE).
`
  );

module.exports = {
  replaceReadme,
};
