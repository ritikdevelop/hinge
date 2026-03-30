const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    messageId: { type: String, required: true, unique: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });
messageSchema.index({ receiverId: 1, senderId: 1 }, { unique: true });

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
