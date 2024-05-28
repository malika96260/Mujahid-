const axios = require("axios");
const fs = require("fs");
const request = require("request");

module.exports = ({ api, event }) => {
  // Check for help command
  if (!!event.body.split(" ")[1] && event.body.split(" ")[1].includes("-help")) {
    const usage =
      "Name: FacebookDL\n\n" +
      "Usage: ¢fbdownloader [url]\n\n" +
      "Description: Facebook video downloader.";
    return api.sendMessage(usage, event.threadID, event.messageID);
  }

  let input = event.body;
  let data = input.split(" ");
  
  // Check if URL is provided
  if (data.length < 2) {
    return api.sendMessage(
      "Where's the Facebook video URL?",
      event.threadID,
      event.messageID
    );
  } else {
    data.shift();
    let url = data.join(" ");
    api.sendMessage(
      "Downloading, please wait...",
      event.threadID,
      event.messageID
    );

    // Request to download Facebook video using the new API
    axios
      .get(`https://markdevs-last-api-a4sm.onrender.com/facebook?url=${url}`)
      .then((response) => {
        let file = fs.createWriteStream(
          "utilities/commands/noprefix/cache/fbvideo.mp4"
        );
        let rqs = request(response.data.url);
        rqs.pipe(file);
        file.on("finish", () => {
          api.sendMessage(
            {
              attachment: fs.createReadStream(
                __dirname + "/cache/fbvideo.mp4"
              ),
            },
            event.threadID,
            event.messageID
          );
        });
      })
      .catch((error) => {
        console.error(error);
        api.sendMessage(
          "Failed to download the video. Please check the URL and try again.",
          event.threadID,
          event.messageID
        );
      });
  }
};
