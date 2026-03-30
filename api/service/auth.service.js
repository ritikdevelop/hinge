const User = require('../models/user.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

 const registerUser = async (userData) => {

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userId = crypto.randomUUID();

    const newUser = {
        userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        gender: userData.gender,
        dateOfBirth: userData.dateOfBirth,
        type: userData.type,
        location: userData.location,
        hometown: userData.hometown,
        workPlace: userData.workPlace,
        jobTitle: userData.jobTitle,
        datingPreferences: userData.datingPreferences || [],
        lookingFor: userData.lookingFor,
        imageUrls: userData.imageUrls,
        prompts: userData.prompts,
        likes: 2,
        roses: 1,
        likedProfiles: [],
        receivedLikes: [],
        matches: [],
        blockedUsers: [],
    };


    const user = new User(newUser);
    await user.save();

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return { token, user: newUser };
}

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid or incorrect password');
  }

  const token = jwt.sign({userId: user.userId, email: user.email}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  return { token, user };
};



module.exports = { registerUser, loginUser };