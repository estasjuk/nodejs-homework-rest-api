const jimp = require("jimp");

const resizeAvatar = async (avatarPath, width, height) => {
  const image = await jimp.read(avatarPath);
  image.resize(width, height);
  await image.writeAsync(avatarPath);
};

module.exports = resizeAvatar;