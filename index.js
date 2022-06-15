import client from './twitterClient.js'

(async () => {

    const tweetsOfAjay = await client.v2.userTimeline('1241292005830823938', { exclude: 'replies'});
      
    console.log(tweetsOfAjay._realData);
})();