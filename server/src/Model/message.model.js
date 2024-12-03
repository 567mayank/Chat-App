import mongoose,{Schema} from "mongoose";

const msgSchema = new Schema({
  msg : {
    type : String,
    required : true
  },
  sender : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  receiver : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  status : {
    type : String,
    enum: ['Sent', 'Delivered', 'Read'],
    default: 'Sent'
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation", 
    required: true,
  },
},{timestamps : true})

msgSchema.index({ sender: 1, receiver: 1 });
msgSchema.index({ conversationId: 1 });

const Message = mongoose.model("Message",msgSchema)

export default Message