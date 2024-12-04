import Message from '../Model/message.model.js'
import Chat from '../Model/chat.model.js'
import User from '../Model/user.model.js'

const userAllChats = async(req,res) => {
  const userId = req?.user?._id
  if(!userId) {
    return res.status(400).json({Message : "Unauthorized Access"})
  }
  try {
    const conversations = await Chat.find({
      participants: userId,
    }).select("-createdAt -messages -__v").populate("participants","-password -__v -socketId"); 

    conversations.forEach((conversation) => {
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== userId.toString()
      );
    });

    return res.status(200).json({
      Message : "All Chat Fetched Successfully",
      conversations
    })
  } catch (error) {
    return res.status(500).json({Message : "Internal Server error in Fetching all Chats"})
  }
}

const addfriend = async(req,res) => {
  const userId = req?.user?._id
  
  if(!userId){
    return res.status(400).json({Message : "Unauthorized Access"})
  }

  const {username} = req.body

  if(!username) {
    return res.status(400).json({Message : "Username not provided"})
  }

  try {
    const reciever = await User.findOne({username:username}).select("-__v -password")

    if(!reciever) {
      return res.status(400).json({Message : "User with this username does not exist"})
    }

    const prevChat = await Chat.findOne({
      participants: { $all: [userId, reciever._id] },  
      participants: { $size: 2 } 
    });

    

    if(prevChat) {
      return res.status(400).json({Message : "Already in your friendlist"})
    } 

    const chat = await Chat.create(
      {
        participants : [userId,reciever._id]
      }
    )

    return res.status(200).json(
      {
        Message : "Friend Added Successfully",
        chat,
        reciever
      }
    )
  } catch (error) {
    return res.status(500).json("Internal Server Error in Adding Friend")
  }
}

const getAllMsg = async(req,res) => {
  const userId = req?.user?._id
  if(!userId) {
    return res.status(400).json({Message : "Unathorized Access"})
  }
  const friendId = req.params?.friendId
  if(!friendId) {
    return res.status(400).json({Message : "Friend Id not provided"})
  }
  try {
    const chat = await Chat.findOne(
      {
        participants: { $all: [userId, friendId] },
      }
    ).select("-__v -createdAt -updatedAt -participants").populate("messages")

    return res.status(200).json({
      Message : "User-Friend Message Fetched Successfully",
      chat
    })
    
  } catch (error) {
    res.status(500).json({Message :"Error in finding Messages specific to friend" })
  }
}

// const addMsg = async(req,res) => {

// }

export {
  userAllChats,
  addfriend,
  getAllMsg
}