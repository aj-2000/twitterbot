import Keyv from "keyv";
import client from '../twitterClient.js'

const key =  'flyingcakesLastTweetId'

const replies = [
  "nice tweet bro",
  "lol 😂",
  "your tweets are awesome",
  "inspiring 🥹",
  "wow!",
  "bruh! wtf is this.",
];

const keyv = new Keyv('sqlite://twitterbot.db');

const lastTweetId = await keyv.get(key);

let tweets = [];

(async  () => {
  try {
    if(lastTweetId === undefined) {
      const tweetsData = await client.v2.userTimeline('1241292005830823938', { exclude: 'replies' });
      tweets = tweetsData?._realData.data
      await keyv.set(key, tweetsData._realData.meta.newest_id);
    } else {
      const tweetsData = await client.v2.userTimeline('1241292005830823938', { exclude: 'replies', since_id: lastTweetId });
      tweets = tweetsData?._realData.data
      if(tweetsData._realData.data !== undefined){
        await keyv.set(key, tweetsData._realData.meta.newest_id);
      }
    }

    tweets === undefined ? console.log('No new tweets found.') : console.log(tweets);

    tweets?.map(async (tweet) => {
      if(tweet.id !== lastTweetId){
        await client.v2.like('1532967152005058560', tweet.id);
        const randomReplyIndex = Math.floor(Math.random()*(replies.length-1));
        await client.v2.reply(
        replies[randomReplyIndex],
        tweet.id,
        );
      }
    })
  } catch (error) {
    console.log(error);
  }
})();









