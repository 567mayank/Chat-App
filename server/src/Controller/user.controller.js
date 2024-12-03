import User from "../Model/user.model.js"

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
    const user = await User.create(
      {
        name,
        email,
        username,
        password
      }
    )
    return res.status(200).json(
      {
        message : "User Registered SuccessFully",
        user
      }
    )
  } catch (error) {
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
      httpOnly : true
    }

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
export {
  register,
  login,
  addFriend
}