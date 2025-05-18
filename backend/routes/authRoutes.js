import express from "express";

const router = express.Router();

router.get("/login",(req,res)=>{
    res.send("login Route")
});

router.get("/signup",(req,res)=>{
    res.send("signup Route")
});

router.get("/logout",(req,res)=>{
    res.send("logout Route")
});

export default router;