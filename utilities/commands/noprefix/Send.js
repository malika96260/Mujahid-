module.exports = ({ api, event, config }) => {
  let { prefix } = config;
  let input = event.body;
  let args = input.split(" ");
  
  if (args.length < 3) {
    api.sendMessage(
      `⚠️Invalid Use Of Command!\n💡Usage: ${prefix}confess [uid|name,uid|name || message]`,
      event.threadID
    );
  } else {
    try {
      const y = args.slice(1).join(" ").split("||").map(item => item.trim());

      const uidsAndNames = y[0];
      const message = y[1];

      if (!uidsAndNames) {
        api.sendMessage("Missing UIDs and names", event.threadID, event.messageID);
        return;
      }

      if (!message) {
        api.sendMessage("Missing message", event.threadID, event.messageID);
        return;
      }

      const uidNameList = uidsAndNames.split(",").map(pair => pair.trim());

      const sendMessageToUID = (uid, name) => {
        const personalizedMessage = `Hello ${name}\n${message}`;
        api.sendMessage(personalizedMessage, uid, () => {
          api.sendMessage("Confession has been sent successfully!", event.threadID, event.messageID);
        });
      };

      const sendMessagesWithDelay = async (uidNameList) => {
        for (let i = 0; i < uidNameList.length; i++) {
          const [uid, name] = uidNameList[i].split("|").map(item => item.trim());
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
          sendMessageToUID(uid, name);
        }
      };

      sendMessagesWithDelay(uidNameList);
      
    } catch (err) {
      api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
    }
  }
};
