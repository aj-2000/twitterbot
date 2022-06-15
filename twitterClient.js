import dotenv from "dotenv";

import { TwitterApi } from 'twitter-api-v2';
dotenv.config();

const twitterClient = new TwitterApi({
  appKey: '4UTv34PGnqMvrYJy8yS8Js2dG',
  appSecret: 'oT8VWWK6a4at93otcI8b9VOWEPtwUZCxGU2cHKFP7BA5uwUead',
  accessToken: '1532967152005058560-REX54Imr8t0lIhnvvB0BP0Y49eXEPf',
  accessSecret: 'UdNhTG1N1vLh5Y5ynxfHq7KZuZUB7Vc3vxL4RIik7SciR',
});

const rwClient = twitterClient.readWrite;

export default rwClient