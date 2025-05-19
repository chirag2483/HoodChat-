import bcrypt from "bcryptjs"
import User from "../models/userModel.js"
import generateTokenAndSetCookie from "../util/generateToken.js";



export const signup = async (req,res)=>{
    // res.send("User Signed Up")
    try{
        const{fullName,userName,password , confirmPassword,gender} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"passwords do not match"})
        }
        
        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({error:"user already exists"})
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        const boyProfilePic = 'https://avatar.iran.liara.run/public/boy?username=${userName}'
        const girlProfilePic = 'https://avatar.iran.liara.run/public/girl?username=${userName}'
        const lgtvProfilePic = 'https://avatar.iran.liara.run/username?username=L+G'
        
        let profilePic;
        if (gender === "male") {
            profilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        } else if (gender === "female") {
            profilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        } else {
            // For lgbtq+ or other
            profilePic = `https://avatar.iran.liara.run/username?username=L+G+${userName}`;
        }
        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic 
        })
        if(newUser){

            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
        
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                userName:newUser.userName,
                profilePic:newUser.profile
                
            })  
        }
        else 
        {
            res.status(400).json({error:"user not created"})
        }
    }
    catch(error){
        console.log("Error in signup",error.message);
        res.status(500).json({error: "Internal server error"});
    }
};


export const login = async (req,res)=>{
    try{
        const {userName,password} = req.body;

        if(!userName || !password){
            return res.status(400).json({error:"please fill all fields"})
        }
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||" ");//gives "" in password in case password not found
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid credentials"})
        }

        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            userName:user.userName,
            profilePic:user.profilePic
        })
    }
    catch(error){
        console.log("Error in login",error.message);
        res.status(500).json({error: "Internal server error"});
    }
}
export const logout = (req,res)=>{  
  try{
       res.cookie("jwt","",{maxAge:0});
         res.status(200).json({message:"logged out successfully"})
    }
    catch(error){
            console.log("Error in logout",error.message);
            res.status(500).json({error: "Internal server error"});
        }
};
