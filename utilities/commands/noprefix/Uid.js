module.exports = async ({ api, event }) => {
  if (event.messagereply) {
    // If there's a message being replied to, send the UID and username of the person who sent that message.
    const senderUserInfo = await api.getUserInfo(event.messagereply.senderID);
    const senderUsername = senderUserInfo[event.messagereply.senderID].name;
    api.sendMessage(`UID of the person you replied to: ${event.messagereply.senderID}\nUsername: ${senderUsername}`, event.threadID);
  } else if (Object.keys(event.mentions).length === 0) {
    // If no mentions and no message reply, send the UID and username of the sender.
    const senderUserInfo = await api.getUserInfo(event.senderID);
    const senderUsername = senderUserInfo[event.senderID].name;
    api.sendMessage(`Your UID: ${event.senderID}\nYour Username: ${senderUsername}`, event.threadID, event.messageID);
  } else {
    // If there are mentions, send UIDs and usernames of the mentioned users.
    const mentionedUserDetails = [];
    for (const mentionedUID of Object.keys(event.mentions)) {
      const mentionedUserInfo = await api.getUserInfo(mentionedUID);
      const mentionedUsername = mentionedUserInfo[mentionedUID].name;
      mentionedUserDetails.push(`UID: ${mentionedUID}, Username: ${mentionedUsername}`);
    }
    api.sendMessage(`User details of mentioned users:\n${mentionedUserDetails.join('\n')}`, event.threadID);
  }
};
