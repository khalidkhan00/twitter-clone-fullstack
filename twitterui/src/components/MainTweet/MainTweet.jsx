import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Timelinetweet from "../Timelinetweet/Timelinetweet";


const MainTweet = () => {
    const [tweetText, setTweetText] = useState("");

  const { currentUser } = useSelector((state) => state.user);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const access_token = localStorage.getItem("access_token"); // Retrieve the access token from local storage
    const access_token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTYzMzVmNWUzZDkxOTBlMGVhM2E4MyIsImlhdCI6MTY4NzU5MjU0NH0.0Jnc8aPTu_AHi9RbOg3xORgYFb60PmyjlD1rGbvYMec';

    const submitTweet = await axios.post(
        "http://localhost:8000/api/tweets",
        {
          userId: currentUser._id,
          description: tweetText,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // Include the access token in the authorization header
          },
        }
      );
      // window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      <Timelinetweet />
    </div>
  );
};

export default MainTweet;