import React, { useState } from 'react';
import './Widgets.css';
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';
import SearchIcon from '@mui/icons-material/Search';

const Widgets = () => {
  const [name, setName] = useState("");
  const [screenName, setScreenName] = useState("");

  console.log("Current input:", screenName);

  const handleSearch = () => {
    setScreenName(name.replace(/\s+/g, ''));
    setName("");
    if (!name) {
      setScreenName("");
    }
  };

  return (
    <div className='widgets'>
      <div className='widgets_input'>
        <SearchIcon className='widgets_SearchIcon' />
        <input
          type='text'
          placeholder='Search twitter'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSearch} className='button'>Search</button>
      </div>
      <div className='widgets_widgetContainer'>
        <h2>What's happening</h2>
        <TwitterTweetEmbed tweetId={'933354946111705097'} />
      </div>
      {screenName && (
        <TwitterTimelineEmbed
          sourceType='profile'
          screenName={screenName}
          options={{ height: 400 }}
          className='profile_new'
        />
      )}
    </div>
  );
};

export default Widgets;
