const login = require("fca-unofficial");
const fs = require("fs/promises");
const color = require("colors");

// Function to get the list of appstates
const getAppstates = async () => {
  try {
    const files = await fs.readdir("appstates");
    return files;
  } catch (error) {
    console.error("Error reading folder:", error);
    throw error;
  }
};

// Function to login with an appstate
const loginWithAppState = async (appstateFile, cb) => {
  try {
    const appStateData = await fs.readFile(`./appstates/${appstateFile}`, "utf8");
    const appState = JSON.parse(appStateData);

    login({ appState }, async (err, api) => {
      if (err) {
        console.error(`Login error for appstate ${appstateFile}`);
        return;
      }

      const cID = api.getCurrentUserID();
      const userInfo = (await api.getUserInfo(cID))[cID];

      console.log(
        `${color.green("Info Login ")}${color.white("Logged in as >>>")} ${color.red(
          `${userInfo.name}`
        )}\n${color.blue("Appstate >>>")} ${color.red(`${appstateFile}`)}`
      );

      api.setOptions({
        logLevel: "silent",
        forceLogin: true,
        listenEvents: true,
        autoMarkDelivery: false,
      });

      api.listen((err, event) => {
        if (err) {
          console.error(err);
          return;
        }
        cb(api, event);
      });
    });
  } catch (err) {
    console.error(color.red(`Error while logging in appstate >>>`), color.blue(appstateFile));
  }
};

async function Listen(cb) {
  try {
    const appstates = await getAppstates();
    for (const appstate of appstates) {
      await loginWithAppState(appstate, cb);
    }
  } catch (error) {
    console.error("Error in Listen function:", error);
  }
}

module.exports = { Listen };
