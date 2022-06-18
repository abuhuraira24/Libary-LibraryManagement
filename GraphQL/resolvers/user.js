const path = require("path");

const fs = require("fs");

module.exports = {
  Mutation: {
    async uploadFile(parents, { file }) {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const stream = createReadStream();

      const pathName = path.join(__dirname + `/public.images/${filename}`);
      const getFile = fs.createWriteStream(pathName);
      await stream.pipe(getFile);

      return {
        url: `http://localhost:5000/images/${filename}`,
      };
    },
  },
};
