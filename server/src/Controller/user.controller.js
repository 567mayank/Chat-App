import User from "../Model/user.model.js"
import {uploadOnCloudinary} from '../utils/cloudinary.js'

const register = async(req,res) => {
  const {name,username,email,password} = req.body
  if(!name || !username || !email || !password ){
    return res.status(400).json({message : "All fields are required"})
  }
  try {
    const existingUser = await User.findOne(
      {
        $or : [{username},{email}]
      }
    )
    if(existingUser) {
      return res.status(400).json({message : "Email/Username Already Taken"})
    }

    let avatarUrl = null;

    if (req.file) {
      avatarUrl = await uploadOnCloudinary(req.file.path); 
    }

    if(!avatarUrl) {
      return res.status(400).json({message : "File Not Uploaded"})
    }

    const user = await User.create(
      {
        name,
        email,
        username,
        password,
        avatar : avatarUrl.url
      }
    )
    return res.status(200).json(
      {
        message : "User Registered SuccessFully",
        user
      }
    )
  } catch (error) {
    console.error("error in registering user",error)
    return res.status(500).json({message : "Internal Server Error in Registering User"})
  }
}

const login = async(req,res) => {
  const {username,password} = req.body
  if(!username || !password) {
    return res.status(400).json({message : "All field are required"})
  }
  try {
    const user = await User.findOne({username})
    if(!user) {
      return res.status(400).json({message : "Username/Password Wrong"})
    }
    const verified = await user.isPasswordCorrect(password)
    if(!verified) {
      return res.status(400).json({message : "Username/Password Wrong"})
    }

    const token = user.generateToken()

    const options = {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      sameSite: 'none', 
      maxAge: 60 * 60 * 24 * 7 * 1000, 
    };
    

    return res
    .status(200)
    .cookie("token",token,options)
    .json(
      {
        message : "User Authenticated SuccessFully"
      }
    )
  } catch (error) {
    return res.status(500).json({message : "Internal Server Error in login of User"})
  }
}

const getUser = async(req,res) => {
  const {username} = req?.params
  if(!username){
    return res.status(400).json({message : "Username not provided"}) 
  }
  try {
    const user = await User.findOne({username}).select("-password -socketId -isActive -__v")
    return res.status(200).json({
      message : "User Info Fetched Successfully",
      user
    })
  } catch (error) {
    return res.status(500).json({message : "Error in fetching user info"}) 
  }
}

const addFriend = async(req,res) => {
  const friendId = req.body
  if(!friendId){
    return res.status(400).json({message : "Friend Username Required"})
  }
  try {
    const friend = await User.findOne({username : friendId}).select("-__v -password")
    if(!friend) {
      return res.status(400).json({message : "Friend with Such Username not found"})
    } 
    return res.status(200).json({
      message : "Friend Fetched SuccessFully",
      friend
    })
  } catch (error) {
    return res.status(500).json({message : "Internal Server Error in Finding Friend"})
  }
} 

const updateSocketId = async(req,res) => {
  const userId = req?.user?._id
  if(!userId){
    return res.status(400).json({message : "Unathorised Access"})
  }
  const {socketId} = req?.body 
  if(!socketId){
    return res.status(400).json({message : "SocketId not provided"})
  }
  try {
    await User.findByIdAndUpdate(
      userId,
      {
        socketId,
        isActive : true
      }
    )
    return res.status(200).json({message : "SocketId Updated Successfully"})
  } catch (error) {
    return res.status(500).json({message : "Internal Server Error in Updating SocketId"})
  }
}

const removeSocketId = async(req,res) => {
  console.log("success")
  const userId = req?.user?._id
  if(!userId){
    return res.status(400).json({message : "Unathorised Access"})
  }
  try {
    await User.findByIdAndUpdate(
      userId,
      {
        socketId : null,
        isActive : false
      }
    )
    return res.status(200).json({message : "SocketId Removed Successfully"})
  } catch (error) {
    return res.status(500).json({message : "Internal Server Error in Removing SocketId"})
  }
}

const logout = async(req,res) => {
  const userId = req?.user?._id
  if(!userId){
    return res.status(400).json({message : "Unauthorised Access"})
  }
  try {
    await User.findByIdAndUpdate(
      userId,
      {
        $set : {
          socketId : null,
          isActive : false
        }
      }
    )
    return res
      .status(200)
      .clearCookie("token")
      .json({
        message : "User Logged Out Successfully"
      })
  } catch (error) {
    console.error("error in logging out user",error)
    return res.status(500).json({message : "Internal Server Error in Logging out User"})
  }
}

export {
  register,
  login,
  getUser,
  addFriend,
  updateSocketId,
  removeSocketId,
  logout
}