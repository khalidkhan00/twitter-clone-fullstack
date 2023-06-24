import express from "express";
import { deleteUser, follow, getUser, unFollow, update } from "../controller/user.js";
import { verifyToken } from "../verifytoken.js";



const router=express.Router();
router.put("/:id", verifyToken, update)
router.put("/follow/:id", verifyToken, follow);
router.put("/unfollow/:id", verifyToken, unFollow);
router.get("/", (req,res)=>{res.send("hello")})
router.get("/find/:id",getUser)
router.delete("/:id", verifyToken, deleteUser);
export default router