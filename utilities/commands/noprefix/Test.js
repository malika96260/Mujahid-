module.exports = ({ api, event, userInfo }) => {
  console.log(userInfo);
  api.sendMessage(`Heyw ${userInfo.name}`, event.threadID, event.messageID);
                          }
