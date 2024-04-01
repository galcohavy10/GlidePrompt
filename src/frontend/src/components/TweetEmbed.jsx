//use react-tweet to pass in an id and display the tweet

import { Tweet } from 'react-tweet';

const TweetEmbed = ({ tweetId }) => {
  return <Tweet id={tweetId} />;
};

export default TweetEmbed;