const path = require("path");

const { createWriteStream } = require("fs");

const authChecker = require("../../utils/auth-checker");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dza2t1htw",
  api_key: process.env.API_KEY || "563859764347624",
  api_secret: process.env.API_SECRET || "ndBih7bre8-OHEII7XS6wS1uTyQ",
});

module.exports = {
  Mutation: {
    uploadIamge: async (_, { file }, context) => {
      let user = authChecker(context);

      let { createReadStream, filename, mimetype, encoding, path } =
        await file.file;

      let location = path.join(__dirname, `../../public/${filename}`);

      let myFile = createReadStream();
      await myFile.pipe(createWriteStream(location));

      try {
        const photo = await cloudinary.v2.uploader.upload(myFile);

        console.log(photo);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
