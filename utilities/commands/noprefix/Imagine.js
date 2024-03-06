const fs = require("fs");
const axios = require("axios");

module.exports = async ({ api, event, config }) => {
  const { prefix } = config;
  const data = event.body.split(" ");

  if (data.length < 2) {
    api.sendMessage(
      `⚠️ Invalid Use Of Command!\n💡 Usage: ${prefix}Imagine [txt]`,
      event.threadID,
      event.messageID
    );
  } else {
    try {
      data.shift();
      const prompt = data.join(" ");
      const url = `https://all-image-genator-d1p.onrender.com/dipto/meta?prompt=${encodeURIComponent(
        prompt
      )}&key=dipto008`; // Updated API URL

      const response = await axios.get(url, { responseType: "arraybuffer" });
      const imageData = Buffer.from(response.data, "binary");

      fs.writeFileSync(__dirname + "/cache/imagine.png", imageData);

      api.sendMessage(
        {
          attachment: fs.createReadStream(__dirname + "/cache/imagine.png"),
        },
        event.threadID,
        event.messageID
      );
    } catch (err) {
      api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
    }
  }
};
