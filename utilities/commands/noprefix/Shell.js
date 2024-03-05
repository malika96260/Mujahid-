module.exports = ({ api, event, config }) => {
  const { admins } = config;
	if (admins.includes(event.senderID)) {
      if (
    !!event.body.split(" ")[1] &&
    event.body.split(" ") [1].includes("-help")
  ) {
    const usage =
      "Name: Shell\n\n" +
      "Usage: ¢shell [cmd]\n\n" +
      "Description: Command prompt.";
    return api.sendMessage(usage, event.threadID, event.messageID);
      }
		let data = event.body.split(" ");
		const {
			exec
		} = require("child_process");
		if (data.length < 2) {
			api.sendMessage("Enter command.", event.threadID, event.messageID);
		} else {
			data.shift();
			let cmd = data.join(" ");
			exec(cmd, (error, stdout, stderr) => {
				if (error) {
					api.sendMessage(`Error: \n${error.message}`, event.threadID, event.messageID);
					return;
				}
				if (stderr) {
					api.sendMessage(`Stderr:\n ${stderr}\n${stdout}`, event.threadID, event.messageID);
					return;
				}
				api.sendMessage(`${stdout}`, event.threadID, event.messageID);
			});
		}
	} else {
		api.sendMessage("You don't have a f*cking permission to use this command!", event.threadID, event.messageID);
	}
                   
