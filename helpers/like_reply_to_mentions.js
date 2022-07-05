import Keyv from "keyv";
import client from "../twitterClient.js";
import { ajaysharmadevId } from "../consts/userIds.js";
import { emoji } from "../consts/emoji.js";
const keyv = new Keyv("sqlite://twitterbot.db");
const key = "lastMentionedTweetId";
const lastTweetId = await keyv.get(key);

let tweets = [];

(async () => {
  try {
    if (lastTweetId === undefined) {
      const tweetsData = await client.v2.userMentionTimeline(
        ajaysharmadevId
      );
      tweets = tweetsData?._realData.data;
      await keyv.set(key, tweetsData._realData.meta.newest_id);
    } else {
      const tweetsData = await client.v2.userMentionTimeline(
       ajaysharmadevId,
        { since_id: lastTweetId }
      );
      tweets = tweetsData?._realData.data;
      if (tweetsData._realData.data !== undefined) {
        await keyv.set(key, tweetsData._realData.meta.newest_id);
      }
    }
    // TODO: Save these tweets to some file, which can be read by humans.
    tweets === undefined
      ? console.log("No new tweets found.")
      : console.log(tweets);

    tweets?.map(async (tweet) => {
      if (tweet.id !== lastTweetId) {
        await client.v2.like(ajaysharmadevId, tweet.id);
        const randomReplyIndex = Math.floor(
          Math.random() * (emoji.length - 1)
        );
        await client.v2.reply(emoji[randomReplyIndex], tweet.id);
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
