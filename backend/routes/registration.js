const express = require("express");
const User = require("../schemas/userSchema");
const router = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup",async (req,res)=>{
    try {

        const {email,password} = req.body;

        const existUser = await User.findOne({email});

        if(existUser) throw new Error("user already exist");

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            email,
            password:hashPassword
        });

        const user = await newUser.save();

        res.send(user);

    } catch (error) {
        if(error.message === "user already exist"){
            res.status(403).send({
                success:false,
                message:error.message
            })
        }
    }
})

router.post("/login",async (req,res)=>{
    try {

        const {email,password} = req.body;
        const user = await User.findOne({email});


        if(!user) throw new Error("user not found")
        
        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(isPasswordMatch){

            req.session.user = {
                isLogin:true,
                id:user._id,
                email:user.email,
            }
            
            const token = jwt.sign({id:user._id},"PrithvirajBhavsar");
            res.cookie("token",token,{httpOnly:true});
            res.send(user)

        }else{
            throw new Error("credentials doesn't match")
        }


    } catch (error) {
        if(error.message === "credentials doesn't match"){
            res.status(401).send({
                success:false,
                message:"Invalid credentials"
            })
        }else if(error.message === "user not found"){
            res.status(401).send({
                success:false,
                message:"user not found"
            })
        }
    }
})

router.get("/authorize",async(req,res)=>{
    try {

        const {token} = req.cookies;

        if(token){

            const verification = jwt.verify(token,"PrithvirajBhavsar")
            const {id} = verification;
            
            const [user] = await User.find({_id:id});

            req.session.user = {
                isLogin:true,
                email:user.email
            }
            
            res.status(200).send({email:user.email});
        }else{
            res.status(401).send({
                success:false,
                message:"user not recognized"
            })
        }

    } catch (error) {
        console.log(error);
    }
})

router.get("/logout",async(req,res)=>{
    try {
        req.session.destroy();
        res.clearCookie("token");
        res.send();
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"something went wrong"
        })
    }
})

module.exports = router;
