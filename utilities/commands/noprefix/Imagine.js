const fs = require("fs");
const https = require("https"); // Change "http" to "https"
module.exports = ({ api, event, config }) => {
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
      const url = `https://sampleapi.netlify.app/.netlify/functions/api/aiimage/generate?prompt=${encodeURIComponent(
        prompt
      )}&chs=300x300`; // Updated API URL

      const file = fs.createWriteStream(__dirname + "/cache/imagine.png");
      https.get(url, function (rqs) {
        rqs.pipe(file);
        file.on("finish", function () {
          api.sendMessage(
            {
              attachment: fs.createReadStream(__dirname + "/cache/imagine.png"),
            },
            event.threadID,
            event.messageID
          );
        });
      });
    } catch (err) {
      api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
    }
  }
};
