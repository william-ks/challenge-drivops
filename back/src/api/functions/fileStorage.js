const s3 = require("../../services/aws");

const upload = async ({ buffer, mimetype, originalname }) => {
  const Files = await s3
    .upload({
      Bucket: process.env.BUCKET,
      Key: `images/${originalname}`,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return {
    url: Files.Location,
    path: Files.Key,
  };
};

module.exports = {
  upload,
};
