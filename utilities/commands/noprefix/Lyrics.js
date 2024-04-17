const axios = require("axios");

module.exports = async ({ api, event, config }) => {
  const { name, prefix } = config;
  let input = event.body;
  let data = input.split(" ");

  if (
    !!event.body.split(" ")[1] &&
    event.body.split(" ")[1].includes("-help")
  ) {
    const usage =
      "Name: Play with Lyrics\n\n" +
      `Usage: ${prefix}playlyrics [Music Title]\n\n` +
      "Description: Sends any music that with lyrics you want.";
    return api.sendMessage(usage, event.threadID, event.messageID);
  }

  if (data.length < 2) {
    api.sendMessage(
      `⚠️Invalid Use Of Command!\n💡Usage: ${prefix}playlyrics <title of music>`,
      event.threadID
    );
  } else {
    try {
      // Remove the command prefix and join the remaining array elements into the music title
      data.shift();
      const title = data.join(" ");

      // Make API call to retrieve lyrics
      const response = await axios.get(`https://musixlyrics.vercel.app/api/lyrics/${encodeURIComponent(title)}`);
      
      // Send message with lyrics
      api.sendMessage(response.data.lyrics, event.threadID, event.messageID);
      
    } catch (err) {
      // Handle errors
      api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
    }
  }
};
