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
        trigger: "hi", 
        responses: [
            "Hiiiiii", 
            "Hi k xa", 
            "Zup Maderpakerr"
        ]
    },
    {
        trigger: "timro", 
        responses: [
            "sabai thok xw", 
            "sab xa", 
            "ekdam babaal"
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
        trigger: "xakka", 
        responses: [
            "tai hos sala xakka", 
            "xakka hos aije mero lado khelaidey", 
            "Tero bau hola xakka"
        ]
    },
    {
        trigger: "machikne", 
        responses: [
            "chup muji", 
            "xada bolyo", 
            "oi muji randi"
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
        trigger:"ko", 
        responses: [
            "koi na koi", 
            "ma"
        ]
    },
    {
        trigger:"Namaste", 
        responses: [
            "Namaste", 
            "Namaskar"
        ]
    },
    {
        trigger:"bujhyo", 
        responses: [
            "nai bujhena", 
            "umm sabai bujhyo"
        ]
    },
    {
        trigger:"valu", 
        responses: [
            "Tmilai ama bau le yei sikako", 
            "Jungle ma hola"
        ]
    },
    {
        trigger:"xada", 
        responses: [
            "oi rada nabol xada", 
            "Xada nabola hai ramro manxey bannu parxa"
        ]
    },
    {
        trigger:"baula", 
        responses: [
            "tai holas baula", 
            "Bado badi navahai"
        ]
    },
    {
        trigger:"😂", 
        responses: [
            "aajhai haas chikne", 
            "nahas baccha"
        ]
    },
    {
        trigger:"bau", 
        responses: [
            "tero bau ", 
            "tero bau sanchai xan",
            "k ama bau tira gako"
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
    {
        trigger:"😮", 
        responses: [
            "mukh ma haldim ?", 
            "alli thulo gara ta khojaidinxu",
            "kochaidim"
        ]
    },
    {
        trigger:"bot", 
        responses: [
            "hajur kina bolako", 
            "yes ?",
            "what ???"
        ]
    },
    {
        trigger:"i love you", 
        responses: [
            "love you too honey .", 
            "love you",
            "thank you keep loving"
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
