module.exports = ({ api, event, userInfo }) => {
  console.log(userInfo);
  api.sendMessage(`Hello ${userInfo.name} Sir, here are some rules that you must follow:

Respect others' opinions and thoughts.
Use appropriate language while chatting.
If we notice someone violating these rules, that individual will be kicked. It's my humble request to obey the rules.
Follow him : FB.me/bisheshxd
Chatbot by Bishesh`, event.threadID, event.messageID);
}
