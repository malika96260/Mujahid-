const http = require("https");
const axios = require("axios");

module.exports = ({ api, event }) => {
  if (!!event.body.split(" ")[1] && event.body.split(" ")[1].includes("-help")) {
    const usage =
      "Name: genderize\n\n" +
      "Usage: genderize [name]\n\n" +
      "Description: Determine gender by name.";
    return api.sendMessage(usage, event.threadID, event.messageID);
  }

  let name = event.body.split(" ").slice(1).join(" ");
  if (!name) {
    return api.sendMessage("Missing name!", event.threadID, event.messageID);
  }

  const url = `https://api.genderize.io/?name=${name}`;

  axios.get(url)
    .then(response => {
      const res = response.data;
      const reply = `Name: ${res.name}\nGender: ${res.gender}\nProbability: ${res.probability * 100}%`;
      api.sendMessage(reply, event.threadID, event.messageID);
    })
    .catch(error => {
      api.sendMessage(error.message, event.threadID, event.messageID);
    });
};
