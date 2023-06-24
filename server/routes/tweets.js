import express from "express";
import { verifyToken } from "../verifytoken.js";
import { createTweet, deleteTweet, editTweet, getAllTweets, getExploreTweets, getUserTweets } from "../controller/tweet.js";


const router = express.Router();
router.post("/", verifyToken, createTweet);
router.delete("/:id", verifyToken, deleteTweet);
router.get("/timeline/:id", getAllTweets);
router.put("/:id", verifyToken, editTweet)


router.get("/user/all/:id", getUserTweets);

router.get("/explore", getExploreTweets);
export default router;

