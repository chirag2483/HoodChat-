import User from "../models/userModel.js"





export const signup = async (req,res)=>{
    res.send("signup user")
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
            password,
            gender,
            profilePic 
        })
        await newUser.save();
        
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            userName:newUser.userName,
            profilePic:newUser.profile
            
        })
    }
    catch(error){
        console.log("Error in signup",error.message);
        res.status(500).json({error: "Internal server error"});
    }
};


export const login = (req,res)=>{
    res.send("login user")
}
export const logout = (req,res)=>{  
    res.send("user logged out")
}