module.exports = ({ api, event, config, currentUserInfo }) => {
  api.sendMessage(
    `｢Information｣\n\nName: Bishesh \nCreator: God Bishesh\nDescription: This is a messenger chatbot designed for educational and entertainment purposes. Thank you for choosing to interact with my chatbot.`,
    event.threadID,
    event.messageID
  );
};
