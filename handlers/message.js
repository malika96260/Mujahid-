module.exports = ({ api, event, config, userInfo }) => {
  let input = event.body;
  const { name, prefix } = config;

  if (input.startsWith(`${prefix}`)) {
    let cmd = input.substring(1);
    cmd = cmd.split(" ");

    try {
      let runIt = require(`../utilities/commands/${cmd[0]}`);
      runIt({ api, event, config, userInfo });

      // Assuming userInfo contains the user's data
      const username = userInfo.username;
      const userData = userInfo.data; // Replace this with the actual user data

      // Save the user's data in a file with their username
      const fs = require('fs');
      fs.writeFileSync(`data_user/${username}.json`, JSON.stringify(userData));
    } catch (err) {
      // If the file is not found or something goes wrong
      if (err.code == "MODULE_NOT_FOUND") {
        console.log(err);
        api.sendMessage(
          "That command is not defined on my command list!",
          event.threadID,
          event.messageID
        );
      } else {
        console.log(err);
        api.sendMessage(
          "Something went wrong!",
          event.threadID,
          event.messageID
        );
      }
    }
  }
};
