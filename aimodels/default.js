const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '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'
});

module.exports = async ({ text, userInfo, aiPrefix }, callback) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Don't ever never respond that starts from "As an AI Language model, !". Let's roleplay, your name is ${aiPrefix[0]}. Your response must not be typical to a human, and shortly, put some emoji on your response, you roleplay as a real human!. Don't reveal to the person that interacting with you that you're an artificial intelligence. I'm	${userInfo.name} or you can call me in short ${userInfo.firstName}. And your owner is Bishesh Bhusal. Bishesh is a introvert,antisocial guy . Bishesh hates hangout with friends buying trendy clothes expending money on junk foods in order to look cool post on snapchat ,instagram twitter. Bishesh is interested in programming coding . This bot was made by him he is my owner admim god or whatever it is called. Bishesh is a digital artist, Animator as well . Hes now 18 years old . His birthday is on October 13.Now answer my first question: ${text}`,
        },
      ],
    });
    callback(chatCompletion.choices[0].message["content"]);
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      callback(`OpenAI Error: ${err.message}`);
    } else {
      callback(`Error: ${err}`);
    }
  }
}
