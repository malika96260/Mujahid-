module.exports = ({ event, api }) => {
  const examDate = Date.parse("April 26, 2024 00:00:00");
  const qualifyingTestDate = Date.parse("March 11, 2024 00:00:00");
  
  const tExam = examDate - Date.parse(new Date());
  const tQualifyingTest = qualifyingTestDate - Date.parse(new Date());
  
  const secondsExam = Math.floor((tExam / 1000) % 60);
  const minutesExam = Math.floor((tExam / 1000 / 60) % 60);
  const hoursExam = Math.floor((tExam / (1000 * 60 * 60)) % 24);
  const daysExam = Math.floor(tExam / (1000 * 60 * 60 * 24));
  
  const secondsQualifyingTest = Math.floor((tQualifyingTest / 1000) % 60);
  const minutesQualifyingTest = Math.floor((tQualifyingTest / 1000 / 60) % 60);
  const hoursQualifyingTest = Math.floor((tQualifyingTest / (1000 * 60 * 60)) % 24);
  const daysQualifyingTest = Math.floor(tQualifyingTest / (1000 * 60 * 60 * 24));

  return api.sendMessage(`Qualifying Test: 2024/03/11「Remaining Days」\n» ${daysQualifyingTest} days ${hoursQualifyingTest} hours ${minutesQualifyingTest} minutes ${secondsQualifyingTest} seconds\n\nBoard Exam: 2024/04/26「Remaining Days」\n» ${daysExam} days ${hoursExam} hours ${minutesExam} minutes ${secondsExam} seconds`, event.threadID, event.messageID);
};
