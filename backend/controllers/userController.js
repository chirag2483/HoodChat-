import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {

    try{
        const LoggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: LoggedInUserId } }).select("-password");//avoid seeing yourself on sidebar
        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.log("Error in getAllUsers",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export default getAllUsers;