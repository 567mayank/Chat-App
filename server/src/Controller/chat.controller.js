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
    const receiver = await User.findOne({username:username}).select("-__v -password")

    if(!receiver) {
      return res.status(400).json({Message : "User with this username does not exist"})
    }

    const prevChat = await Chat.findOne({
      participants: { $all: [userId, receiver._id] },  
      participants: { $size: 2 } 
    });

    

    if(prevChat) {
      return res.status(400).json({Message : "Already in your friendlist"})
    } 

    const chat = await Chat.create(
      {
        participants : [userId,receiver._id]
      }
    )

    return res.status(200).json(
      {
        Message : "Friend Added Successfully",
        chat,
        receiver
      }
    )
  } catch (error) {
    return res.status(500).json("Internal Server Error in Adding Friend")
  }
}

export {
  userAllChats,
  addfriend
}