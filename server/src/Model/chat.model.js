import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    
  },
  { timestamps: true }
);

chatSchema.index({ participants: 1 });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;