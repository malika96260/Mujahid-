module.exports = async ({ api, event, config, userInfo }) => {
  let input = event.body;

  const sim = [
    {
        trigger: "hello", 
        responses: [
            "Hello", 
            "Hallooo", 
            "Zup Maderpaker"
        ]
    },
    {
        trigger: "Roshani", 
        responses: [
            "khali uslai nabolau na", 
            "Roshni bishesh sanga xa", 
            "No disturbance please"
        ]
    },
    {
        trigger: "Shishir", 
        responses: [
            "Sanskari kta ho", 
            "Ekdam Ramro manxey", 
            "Shishir handsome kta ho"
        ]
    },
    {
        trigger: "haha", 
        responses: [
            "haserai morlas khatey", 
            "malai ruwayera hasxas 😡", 
            "nahas ."
        ]
    },
    {
        trigger: "I love you", 
        responses: [
            "sorry I have girlfriend", 
            "please convey this to my owner", 
            "sojo bot dekhnai nahuni"
        ]
    },
    {
        trigger: "Ahh", 
        responses: [
            "Bhh", 
            "Ehh", 
            "Zhh"
        ]
    },
    {
        trigger: "sanchai", 
        responses: [
            "ekdam . tmi ?", 
            "thik xa hajur", 
            "nai timro yaad le sataxa"
        ]
    },
    {
        trigger: "jheu lagyo", 
        responses: [
            "kata tira lagyo", 
            "horaa gajab vayexa", 
            "ramro vayexa ta"
        ]
    },
    {
        trigger: "Bot", 
        responses: [
            "hajur", 
            "mero naam Bishesh ho", 
            "Kati bolako jheu lagyo"
        ]
    },
    {
        trigger: "bepy", 
        responses: [
            "hajur baby", 
            "yes honey", 
            "yes darling"
        ]
    },
    {
        trigger: "khaja khayeu", 
        responses: [
            "umm tmile ni?", 
            "yes khako", 
            "yeasto malai nasoda"
        ]
    },
    {
        trigger: "hora", 
        responses: [
            "Haina hola", 
            "Ambo sachhi ho ?", 
            "haina ni tmi jhukkiyeau "
        ]
    },
    {
        trigger: "xkka", 
        responses: [
            "tai hos sala xakka", 
            "xakka hos aije mero lado khelaidey", 
            "Tero bau hola xakka"
        ]
    },
    {
        trigger: "Hi", 
        responses: [
            "Hi sir namaste", 
            " namskar van", 
            "hi k xa sathi"
        ]
    },
    {
        trigger: "Machikne", 
        responses: [
            "chup muji", 
            "xada bolyo", 
            "Oi muji randi"
        ]
    },
    {
        trigger: "muji", 
        responses: [
            "teri ama muji", 
            "tai muji", 
            " fuck you"
        ]
    }, 
    {
        trigger:"khana khayeu", 
        responses: [
            "umm tmi le ?", 
            "hajur khako", 
            "umm soadeako ma tq"
        ]
    },
    {
        trigger:"umm", 
        responses: [
            "khali umm gara", 
            "k umm umm gareako"
        ]
    },
    {
        trigger:"huss", 
        responses: [
            "ta maith*n", 
            "k huss vaneako"
        ]
    },
    {
        trigger:"k gardai", 
        responses: [
            "basdai. tmi ni ?", 
            "khana khadai xu",
            "assignment 😭"
        ]
    },
];

  function simsimi(prompt, array) {
      const lowerPrompt = prompt.toLowerCase();

      const foundItem = array.find(item => lowerPrompt.includes(item.trigger));

      if (foundItem) {
          const randomIndex = Math.floor(Math.random() * foundItem.responses.length);
          return foundItem.responses[randomIndex];
      }

      return "";
  }


  let cID = api.getCurrentUserID();
  let currentUserInfo = await api.getUserInfo(cID);
  currentUserInfo = currentUserInfo[cID];
  let aiPrefix = currentUserInfo.firstName.split(" ");
  const { name, prefix } = config;
  //Prefix based commands
  if (input.startsWith(`${prefix}`)) {
    let cmd = input.substring(1);
    cmd = cmd.split(" ");
    try {
      if (cmd[0].length == 0) {
        return api.sendMessage(
          {
            body: "Yess " + userInfo.firstName + "?, that's my f*cking prefix.",
          },
          event.threadID,
          event.messageID
        );
      } else {
        let runIt = require(`../utilities/commands/${cmd[0]}`);
        runIt({ api, event, config, userInfo });
      }
    } catch (err) {
      //If the file not foundor something error.
      if (err.code == "MODULE_NOT_FOUND") {
        api.sendMessage(
          `Command '${cmd[0]}' is not f*cking found on command list.`,
          event.threadID,
          event.messageID
        );
      } else {
        console.log(err);
        api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
      }
    }
  }
  //Personalized AI based on user name!
  else if (input.startsWith(aiPrefix[0])) {
    let data = input.split(" ");
    if(data.length < 2) {
      api.sendMessage("What?", event.threadID, event.messageID);
    } else {
      try {
        data.shift()
        let ai = require("../aimodels/default");
        ai({ text: data.join(" "), userInfo, aiPrefix }, (res) => {
          api.sendMessage(res, event.threadID, event.messageID)
        })
      } catch (err) {
        api.sendMessage(`Error: ${err}`, event.threadID, event.messageID)
      }
    }
  }
  //Code block of no prefix!
  else {
    try {
      let cmd = input.split(" ");
      let runIt = require(`../utilities/commands/noprefix/${cmd[0]}`);
      runIt({ api, event, config, userInfo });
    } catch (err) {
      if(err.code == "MODULE_NOT_FOUND") {
          let inp = input.toLowerCase();
          const response = simsimi(inp, sim);
          api.sendMessage(response, event.threadID, event.messageID)
      } else {
          return;
      }
    }
  }
};
