import Message from '../Model/message.model.js'
import Chat from '../Model/chat.model.js'
import User from '../Model/user.model.js'

const userAllChats = async (req, res) => {
  const userId = req?.user?._id;

  if (!userId) {
    return res.status(400).json({ Message: "Unauthorized Access" });
  }

  try {
    const conversations = await Chat.find({
      participants: userId,
    })
      .select("-createdAt -messages -__v")
      .populate("participants", "-password -__v -socketId");

    // Remove  user from  participants list
    conversations.forEach((conversation) => {
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== userId.toString()
      );
    });

    const conversationsWithUnreadCount = await Promise.all(
      conversations.map(async (conversation) => {

        const unreadCount = await Message.countDocuments({
          conversationId: conversation._id,
          reciever: userId,
          status: "Sent",
        });

        return {
          ...conversation.toObject(), 
          unreadCount,  
        };
      })
    );

    return res.status(200).json({
      Message: "All Chats Fetched Successfully",
      conversations: conversationsWithUnreadCount,
    });
  } catch (error) {
    console.error(error);  
    return res.status(500).json({ Message: "Internal Server Error in Fetching all Chats" });
  }
};

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

    console.log(userId,reciever._id)
    const prevChat = await Chat.findOne({
      participants: { $all: [userId, reciever._id], $size: 2 }
    });
    

    console.log(prevChat)
    

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

const markSeen = async(req,res) => {
  const userId = req?.user?._id
  if(!userId) {
    return res.status(400).json({Message : "Unauthorised Access"})
  }
  const {messageId} = req?.params
  if(!messageId) {
    return res.status(400).json({Message : "Message Id not provided"})
  }
  try {
    await Message.findByIdAndUpdate(
      messageId,
      {
        $set: {status : "Read"}
      }
    )
    return res.status(200).json({Message : "Message Seen Updated Successfully"})
  } catch (error) {
    res.status(500).json({Message : "Internal Server Error in Updating Seen Messages"})
  }
}

const markSeenAllMsg = async (req, res) => {
  const userId = req?.user?._id;
  
  if (!userId) {
    return res.status(400).json({ Message: "Unauthorized Access" });
  }

  const { recieverId } = req?.params;
  
  if (!recieverId) {
    return res.status(400).json({ Message: "Receiver Id not provided" });
  }

  try {
    const result = await Message.updateMany(
      {
        sender: recieverId,
        reciever: userId,
      },
      {
        $set: { status: "Read" },
      }
    );    

    if (result.nModified === 0) {
      return res.status(404).json({ Message: "No messages to update" });
    }

    return res.status(200).json({ Message: "All messages marked as read" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Message: "Internal Server Error in Updating All Seen Messages" });
  }
};


export {
  userAllChats,
  addfriend,
  getAllMsg,
  markSeen,
  markSeenAllMsg
}