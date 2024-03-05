const axios = require('axios');
const fs = require('fs');
const google = require('googlethis'); // Added the missing import

module.exports = async ({ api, event }) => {
  const bannedGC = ["9492786270746965"];
  if (!bannedGC.includes(event.threadID)) {
    if (
      !!event.body.split(" ")[1] &&
      event.body.split(" ")[1].includes("-help")
    ) {
      const usage =
        "Name: defineWord\n\n" +
        "Usage: defineWord [word]\n\n" +
        "Description: Retrieves the definition of the specified word using Google Dictionary.";
      return api.sendMessage(usage, event.threadID, event.messageID);
    }
    const input = event.body.split(' ');
    const word = input[1];
    const options = {
      additional_params: {
        hl: 'en'
      }
    };

    try {
      const query = `define ${word}`;
      const response = await google.search(query, options);
      const dictionary = response.dictionary;

      if (dictionary) {
        let message = '';

        message += `Word: ${dictionary.word}\n`;
        message += `Phonetic: ${dictionary.phonetic}\n\n`;

        dictionary.definitions.forEach((definition, index) => {
          message += `Definition ${index + 1}: ${definition}\n`;
        });

        message += '\nExamples:\n';
        dictionary.examples.forEach((example, index) => {
          message += `Example ${index + 1}: ${example}\n`;
        });

        const audioUrl = dictionary.audio;
        if (audioUrl) {
          const audioPath = __dirname + "/cache/word_audio.mp3"; // Update the path as needed
          await downloadFile(audioUrl, audioPath);
          const audioAttachment = fs.createReadStream(audioPath);
          api.sendMessage(
            {
              body: message,
              attachment: audioAttachment
            },
            event.threadID,
            event.messageID
          );
        } else {
          api.sendMessage(message, event.threadID, event.messageID);
        }
      } else {
        api.sendMessage('No definition found for the specified word.', event.threadID);
      }
    } catch (err) {
      console.error(`Error retrieving word definition: ${err}`);
      api.sendMessage('Failed to retrieve word definition. Please try again later.', event.threadID);
    }
  } else {
    api.sendMessage(
      "This command is not allowed on this gc.",
      event.threadID,
      event.messageID
    );
  }
};

async function downloadFile(url, outputPath) {
  const response = await axios.get(url, { responseType: 'stream' });
  const writer = fs.createWriteStream(outputPath);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}
