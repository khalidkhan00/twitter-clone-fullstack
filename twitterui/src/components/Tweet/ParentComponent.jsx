// ParentComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweet from './Tweet';

const ParentComponent = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tweets/explore');
      setTweets(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleDelete = async (tweetId) => {
    try {
      const access_token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/api/tweets/${tweetId}`,
      
      {
        headers: {
          Authorization: `Bearer ${access_token}`, // Include the access token in the authorization header
        },
      });
      setTweets((prevTweets) => prevTweets.filter((tweet) => tweet._id !== tweetId));
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={tweet._id} tweet={tweet} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ParentComponent;
