const axios = require('axios');
const moment = require('moment-timezone');

module.exports = async ({ api, event }) => {
  if (event.body.split(' ')[1] === '-help') {
    const usage = "Usage: wiki <word>\n\n" +
      "Description: Get a summary and information about a topic from Wikipedia.\n\n" +
      "Example: wiki OpenAI";
    api.sendMessage(usage, event.threadID);
    return Promise.resolve();
  }

  const data = event.body.split(' ');

  if (data.length < 2) {
    api.sendMessage('Invalid Use Of Command!\nUsage: Wiki <word>', event.threadID);
  } else {
    try {
      data.shift();
      let txtWiki = '';
      const res = await getWiki(data.join(' '));

      if (res === undefined || res.title === undefined) {
        throw new Error(`API RETURNED THIS: ${res}`);
      }

      // Convert timestamp to Nepali time
      const nepaliTime = moment(res.timestamp).tz('Asia/Kathmandu').format('YYYY-MM-DD HH:mm:ss');

      txtWiki += `🔎 You searched for the word '${res.title}' \n\n TimeStamp: ${nepaliTime}\n\n Description: ${res.description}\n\n Info: ${res.extract}\n\nSource: https://en.wikipedia.org`;
      api.sendMessage(txtWiki, event.threadID, event.messageID);
    } catch (err) {
      api.sendMessage(err.message, event.threadID, event.messageID);
    }
  }
};

async function getWiki(q) {
  try {
    const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${q}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
