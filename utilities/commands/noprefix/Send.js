module.exports = ({ api, event, config }) => {
  let { prefix } = config;
  let input = event.body;
  let args = input.split(" ");
  
  if (args.length < 3) {
    api.sendMessage(
      `⚠️Invalid Use Of Command!\n💡Usage: ${prefix}confess [fb url or uid | message]`,
      event.threadID
    );
  } else {
    try {
      const y = args.slice(1).join(" ").split("|").map(item => item.trim());

      const t = y[0];
      const t2 = y[1];

      if (!t) {
        api.sendMessage("Missing facebook url or uid", event.threadID, event.messageID);
        return;
      }

      if (!t2) {
        api.sendMessage("Missing message", event.threadID, event.messageID);
        return;
      }

      if (t.startsWith("https://facebook.com")) {
        api.getUID(t, (err, res) => {
          if (err) {
            api.sendMessage("I'm sorry but your confession has failed to send, I think it's time to chat that person and confess your feelings (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)", event.threadID, event.messageID);
          } else {
            const k = res;
            api.sendMessage(`󰟫╭ 𝗬𝗼𝘂'𝘃𝗲 𝗴𝗼𝘁 𝗮 𝗺𝗲𝘀𝘀𝗮𝗴𝗲\n\n󰥴 : ${t2}\n━━━━━━━━━━━━━━━━━━━━━\n• :don't bother me to ask who's the sender‚ you're just wasting your time (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)`, k, () => {
              api.sendMessage("Confession has been sent successfully!", event.threadID, event.messageID);
            });
          }
        });
      } else {
        const k = t;
        api.sendMessage(`󰟫╭ 𝗬𝗼𝘂'𝘃𝗲 𝗴𝗼𝘁 𝗮 𝗺𝗲𝘀𝘀𝗮𝗴𝗲\n\n󰥴 : ${t2}\n━━━━━━━━━━━━━━━━━━━━━\n• :don't bother me to ask who's the sender‚ you're just wasting your time (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)`, k, () => {
          api.sendMessage("Confession has been sent successfully!", event.threadID, event.messageID);
        });
      }
    } catch (err) {
      api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
    }
  }
};
