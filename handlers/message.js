module.exports = async ({ api, event, config, userInfo }) => {
  let input = event.body;

  const sim = [
    {
      trigger: "hello",
      responses: [
        "Hello there! It's wonderful to see you.",
        "Hallooo! How's your day going?",
        "Hi sir/madam, I hope you're having a splendid day!",
        "Greetings! What can I assist you with today?",
        "Hey! It's a pleasure to meet you."
      ]
    },
    {
      trigger: "hi",
      responses: [
        "Hey there! How are you doing today?",
        "Hi! It's great to have you here.",
        "Greetings! How can I help you on this fine day?",
        "Hello! Hope you're feeling fantastic.",
        "Hey! What's up?"
      ]
    },
    {
      trigger: "how are you",
      responses: [
        "I'm doing exceptionally well, thank you for asking! How about you?",
        "I'm great, how about yourself? I hope everything is going wonderfully!",
        "Fantastic, thanks for asking! How are things on your end?",
        "I'm feeling amazing, and I hope you are too! What's new with you?",
        "I'm quite well, thank you! And you? How's life treating you today?"
      ]
    },
    {
      trigger: "bye",
      responses: [
        "Goodbye! Take care and have a great day ahead.",
        "See you later! Don't hesitate to come back if you need anything.",
        "Take care! Looking forward to our next conversation.",
        "Farewell! Wishing you all the best.",
        "Goodbye! Stay safe and well."
      ]
    }
  ];

  function simsimi(prompt, array) {
    const lowerPrompt = prompt.toLowerCase();
    const foundItem = array.find(item => lowerPrompt.includes(item.trigger));

    if (foundItem) {
      const randomIndex = Math.floor(Math.random() * foundItem.responses.length);
      return foundItem.responses[randomIndex];
    }

    return "";
  }

  let cID = api.getCurrentUserID();
  let currentUserInfo = await api.getUserInfo(cID);
  currentUserInfo = currentUserInfo[cID];
  let aiPrefix = currentUserInfo.firstName.split(" ");
  const { name, prefix } = config;

  // Prefix based commands
  if (input.startsWith(`${prefix}`)) {
    let cmd = input.substring(1).split(" ");
    try {
      if (cmd[0].length === 0) {
        return api.sendMessage(
          {
            body: "Yes " + userInfo.firstName + "?, that's my prefix.",
          },
          event.threadID,
          event.messageID
        );
      } else {
        let runIt = require(`../utilities/commands/${cmd[0]}`);
        runIt({ api, event, config, userInfo });
      }
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND") {
        api.sendMessage(
          `Command '${cmd[0]}' is not found on command list.`,
          event.threadID,
          event.messageID
        );
      } else {
        console.log(err);
        api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
      }
    }
  }
  // Personalized AI based on user name
  else if (input.startsWith(aiPrefix[0])) {
    let data = input.split(" ");
    if (data.length < 2) {
      api.sendMessage("What?", event.threadID, event.messageID);
    } else {
      try {
        data.shift();
        let ai = require("../aimodels/default");
        ai({ text: data.join(" "), userInfo, aiPrefix }, (res) => {
          api.sendMessage(res, event.threadID, event.messageID);
        });
      } catch (err) {
        api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
      }
    }
  }
  // Code block of no prefix
  else {
    try {
      let cmd = input.split(" ");
      let runIt = require(`../utilities/commands/noprefix/${cmd[0]}`);
      runIt({ api, event, config, userInfo });
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND") {
        let inp = input.toLowerCase();
        const response = simsimi(inp, sim);
        api.sendMessage(response, event.threadID, event.messageID);
      } else {
        return;
      }
    }
  }
};
