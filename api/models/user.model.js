const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const likeSchema = new mongoose.Schema({
  userId: {
    type: String, //Represents who sent or received the like
  },
  likedUserId: {
    type: String,   // For likedProfiles
  },
  type: { type: String }, // 'image' or 'prompt'
  category: { type: String }, // 'Rose' etc.
  image: { type: String },
  comment: { type: String },
  prompt: {
    question: { type: String },
    answer: { type: String },
  },
});

const subscriptionSchema = new mongoose.Schema({
  subscriptionId: { type: String },
  planName: { type: String },
  price: { type: String },
  plan: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String }
});

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  type: { type: String },
  location: { type: String },
  hometown: { type: String },
  workPlace: { type: String },
  jobTitle: { type: String },
  datingPreferences: [{ type: String }],
  lookingFor: { type: String },
  imageUrls: [{ type: String }],
  prompts: [promptSchema],
  likes: { type: Number, default: 2 },
  roses: { type: Number, default: 1 },
  likesLastUpdated: { type: Date, default: Date.now },
  likedProfiles: [likeSchema],
  receivedLikes: [likeSchema],
  matches: [{ type: String }],
  blockedUsers: [{ type: String }],
  subscriptions: [subscriptionSchema]
}, {
  timestamps: true
});


const User = mongoose.model("user", userSchema);

module.exports = User;
