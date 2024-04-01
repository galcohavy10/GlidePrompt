import React, { useEffect } from 'react';
import TweetEmbed from './TweetEmbed';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SocialProof = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // controls the speed of the animation
    });
  }, []);

  return (
    <div className="social-proof">
<h2 className="text-4xl font-light mt-10 mb-4 text-white text-center" data-aos="fade-up">What people are saying</h2>
      <div className="w-full overflow-x-auto whitespace-nowrap">
        <div className="inline-flex gap-4 p-4" data-aos="fade-up" data-aos-delay="200">
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
