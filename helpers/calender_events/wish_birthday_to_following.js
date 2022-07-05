import client from "../../twitterClient.js";
import { birthdays } from "../../consts/birthdays.js";
const currentDate = new Date();
const currentDateMonthString =
  `${currentDate.getDate()}${currentDate.getMonth()}`.toString();

(async () => {
  try {
    birthdays[currentDateMonthString]?.map(async (userId) => {
      const { data: createdTweet } = await client.v2
        .tweet(`🎈🎉 Happy Birthday ! 🥳  @${userId}`);
      console.log("Tweet", createdTweet.id, ":", createdTweet.text);
    });
  } catch (error) {
    console.log(error);
  }
})();
