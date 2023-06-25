import Tweet from "../model/Tweet.js";
import { handleError } from "../error.js";
import User from "../model/User.js";



export const createTweet = async (req, res, next) => {
    const newTweet = new Tweet(req.body);
    try {
      const savedTweet = await newTweet.save();
      res.status(200).json(savedTweet);
    } catch (err) {
      handleError(500, err);
    }
  };

  // export const deleteTweet = async (req, res, next) => {
  //   try {
  //     const tweet = await Tweet.findById(req.params.id);
  //     if (tweet.userId === req.body.id) {
  //       await tweet.deleteOne();
  //       res.status(200).json("tweet has been deleted");
  //     } else {
  //       handleError(500, err);
  //     }
  //   } catch (err) {
  //     handleError(500, err);
  //   }
  // };

  export const deleteTweet = async (req, res, next) => {
    try {
      const tweet = await Tweet.findById(req.params.id);
      if (tweet.userId === req.body.id) {
        await tweet.deleteOne();
        res.status(200).json("tweet has been deleted");
      } else {
        handleError(500, err);
      }
    } catch (err) {
      handleError(500, err);
    }
  };

  export const editTweet = async (req, res, next) => {
    try {
      const tweet = await Tweet.findById(req.params.id);
      if (tweet.userId === req.body.id) {
        tweet.description = req.body.description; // Update the tweet's text with the new text
        await tweet.save(); // Save the updated tweet
        res.status(200).json(tweet);
      } else {
        res.status(401).json("Unauthorized to edit this tweet");
      }
    } catch (err) {
      handleError(500, err);
    }
  };


  export const getAllTweets = async (req, res, next) => {
    try {
      const currentUser = await User.findById(req.params.id);
      const userTweets = await Tweet.find({ userId: currentUser._id });
      const followersTweets = await Promise.all(
        currentUser.following.map((followerId) => {
          return Tweet.find({ userId: followerId });
        })
      );
  
      res.status(200).json(userTweets.concat(...followersTweets));
    } catch (err) {
      handleError(500, err);
    }
  };

  export const getUserTweets = async (req, res, next) => {
    try {
      const userTweets = await Tweet.find({ userId: req.params.id }).sort({
        createAt: -1,
      });
  
      res.status(200).json(userTweets);
    } catch (err) {
      handleError(500, err);
    }
  };

  export const getExploreTweets = async (req, res, next) => {
    try {
      const exploreTweets = await Tweet.find({}).sort({ createdAt: -1 });
  
      res.status(200).json(exploreTweets);
    } catch (err) {
      handleError(500, err);
    }
  };
  