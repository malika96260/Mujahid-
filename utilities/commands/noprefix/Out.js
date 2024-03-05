module.exports = async ({ event, api, config }) => {
  // Make sure 'admin' is correctly defined in your config object
  const { admins } = config;

  if (admins.indexOf(event.senderID) !== -1) {
    // Check if the sender is an admin

    // You can add any additional checks or logic here as needed

    // Leave the group
    try {
      await api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
      api.sendMessage("I have left the group.", event.threadID);
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Failed to leave the group.", event.threadID);
    }
  } else {
    // If the sender is not an admin, inform them that they don't have permission
    api.sendMessage("You don't have permission to use this command.", event.threadID, event.messageID);
  }
};

