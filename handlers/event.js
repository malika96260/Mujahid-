module.exports = ({ api, event, config, userInfo }) => {
  try {
    if (event.logMessageType == "log:subscribe") {
      require("../handlers/events/join.js")({ api, event, config });
    } else if (event.logMessageType == "log:unsubscribe") {
      require("../handlers/events/left.js")({ api, event, config });
    } else {
      // Handle other cases if needed
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Optionally handle the error further, e.g., send an error response
  }
};
￼Enter
