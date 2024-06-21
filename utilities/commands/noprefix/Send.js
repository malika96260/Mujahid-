module.exports = ({ api, event, userInfo }) => {
  let input = event.body;
  let data = input.split("|");
  if (data.length !== 2) {
    api.sendMessage(
      `⚠️ Invalid use of command!\n💡 Usage: uid|message`,
      event.threadID
    );
  } else {
    let uid = data[0].trim();
    let message = data[1].trim();
    
    // Here you should have a way to map UID to a name or identifier
    // For example, a database lookup or predefined mapping
    
    // Replace the following line with your logic to get user information
    let userName = getUserInfoFromUID(uid); // Implement this function
    
    if (userName) {
      api.sendMessage(`Sending message "${message}" to ${userName}`, event.threadID);
      // Assuming you have a way to fetch threadID based on UID, replace threadID with appropriate value
      api.sendMessage(`${message}`, threadID); // Replace threadID with appropriate value
    } else {
      api.sendMessage(`User with UID ${uid} not found.`, event.threadID);
    }
  }
};
