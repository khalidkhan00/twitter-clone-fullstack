import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { following } from '../../redux/userSlice';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import Tweet from '../../components/Tweet/Tweet';
import EditProfile from '../../components/EditProfile/EditProfile';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userTweets, setUserTweets] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweetsResponse = await axios.get(`http://localhost:8000/api/tweets/user/all/${id}`);
        const userProfileResponse = await axios.get(`http://localhost:8000/api/users/find/${id}`);

        setUserTweets(userTweetsResponse.data);
        setUserProfile(userProfileResponse.data);
      } catch (err) {
        console.log('Error:', err);
      }
    };

    fetchData();
  }, [id]);

  const handleFollow = async () => {
    try {
      const endpoint = currentUser.following.includes(id) ? 'unfollow' : 'follow';
      const response = await axios.put(`http://localhost:8000/api/users/${endpoint}/${id}`, {
        id: currentUser._id,
      });

      dispatch(following(id));
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tweets/${tweetId}`);
      setUserTweets((prevTweets) => prevTweets.filter((tweet) => tweet._id !== tweetId));
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <img
              src={userProfile?.profilePicture}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
            {currentUser._id === id ? (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            ) : (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                {currentUser.following.includes(id) ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
          <div className="mt-6">
            {userTweets.map((tweet) => (
              <div className="p-2" key={tweet._id}>
                <Tweet tweet={tweet} onDelete={handleDeleteTweet} />
              </div>
            ))}
          </div>
        </div>
        <div className="px-6">
          <RightSidebar />
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;
