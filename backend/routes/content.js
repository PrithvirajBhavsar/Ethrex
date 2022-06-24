const express = require("express");
const Comment = require("../schemas/commentSchema");
const Content = require("../schemas/contentSchema");
const router = express();

router.post("/movies",async(req,res)=>{
    try {
        const newContent = new Content(req.body);
        const addedContent = await newContent.save();

        res.send(addedContent);
    } catch (error) {
       console.log(error); 
    }
})

router.get("/movies",async (req,res)=>{
    try {
        const content = await Content.find({category:"movie"});
        res.send(content);
    } catch (error) {
        console.log(error);
    }
})


router.get("/show",async (req,res)=>{
    try {
        const content = await Content.find({category:"show"});
        res.send(content);
    } catch (error) {
        console.log(error);
    }
})

router.get("/content/:id",async (req,res)=>{
    try {
        const content = await Content.findById(req.params.id);
        res.send(content);
    } catch (error) {
        console.log(error);
    }
})

router.post("/comment",async (req,res)=>{
    try {
        const newComment = new Comment({...req.body,postedBy:req.session.id});
        await newComment.save();
        res.send(newComment);
    } catch (error) {
        console.log(error);
    }
})

router.post("/getcomments",async (req,res)=>{
    try {
        const comments = await Comment.find({content:req.body.id});
        res.send(comments);
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;