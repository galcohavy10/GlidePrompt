import TweetEmbed from './TweetEmbed';
import '../styles/SocialProof.css';

const SocialProof = () => {
  return (
    <div className="social-proof">
      <h2>What people are saying</h2>
      <div className="tweets-container">
        <div className="tweets">
          <TweetEmbed tweetId="1683920951807971329" />
          <TweetEmbed tweetId="541278904204668929" />
          <TweetEmbed tweetId="1683920951807971329" />
          <TweetEmbed tweetId="1683920951807971329" />
          <TweetEmbed tweetId="1683920951807971329" />
          </div>
      </div>
    </div>
  );
};

export default SocialProof;