import Keyv from "keyv";
import client from "../twitterClient.js";
import { ajaysharmadevId } from "../consts/userIds.js";
const key = "lastTweetTime";

const keyv = new Keyv("sqlite://twitterbot.db");

const lastTweetTime = await keyv.get(key);

let tweets = [];
let followings = [];
(async () => {
  try {
    await client.v2
      .following(ajaysharmadevId)
      .then((followingsData) => {
        followings = followingsData.data;
      })
      .finally(() => {
        console.log(followings);
      });

    tweets = await Promise.all(followings.map(async (following) => {
      const tweetsData = await client.v2
        .userTimeline(following.id, { exclude: "replies" })
        return tweetsData._realData.data;
    }));
    console.log(tweets)
  } catch (error) {
    console.log(error);
  }
})();
