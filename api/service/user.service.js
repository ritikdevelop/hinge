const User = require('../models/user.model');
const dayjs = require('dayjs');
const crypto = require('crypto');

const getUserInfo = async userId => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error('User not found');
  return user;
};

const getMatchesForUser = async userId => {
  const userResult = await User.findOne({ userId });
  if (!userResult) throw new Error('User not found');

  const { gender, datingPreferences, matches, likedProfiles } = userResult;
  const genderFilter =
    datingPreferences.length > 0 ? datingPreferences : ['None'];
  const excludeIds = [
    ...matches,
    ...(likedProfiles.map(lp => lp.likedUserId) || []),
    userId,
  ];

  const matchesResult = await User.find({
    userId: { $nin: excludeIds },
    gender: { $in: genderFilter },
  });

  return matchesResult.map(item => ({
    userId: item.userId,
    email: item.email,
    firstName: item.firstName,
    gender: item.gender,
    location: item.location,
    lookingFor: item.lookingFor,
    dateOfBirth: item.dateOfBirth,
    hometown: item.hometown,
    type: item.type,
    jobTitle: item.jobTitle,
    workPlace: item.workPlace,
    imageUrls: item.imageUrls || [],
    prompts: item.prompts || [],
  }));
};

const likeProfile = async (
  userId,
  likedUserId,
  image,
  comment,
  type,
  prompt,
) => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error('User not found');

  const likesRemaining = user.likes;
  const likesLastUpdated = new Date(user.likesLastUpdated || 0);
  const now = new Date();
  const maxLikes = 2;
  const oneDay = 24 * 60 * 60 * 1000;

  if (now - likesLastUpdated >= oneDay) {
    user.likes = maxLikes;
    user.likesLastUpdated = now;
    await user.save();
  } else if (likesRemaining <= 0) {
    throw new Error('Daily like limit reached');
  }

  user.likes -= 1;
  await user.save();

  let newLike = { userId, type };
  if (type == 'image') {
    if (!image) throw new Error('Image url is required');
    newLike.image = image;
  } else if (type == 'prompt') {
    if (!prompt || !prompt.question || !prompt.answer)
      throw new Error('Prompts are required');
    newLike.prompt = prompt;
  }
  if (comment) newLike.comment = comment;

  await User.updateOne(
    { userId: likedUserId },
    { $push: { receivedLikes: newLike } },
  );
  await User.updateOne(
    { userId },
    { $push: { likedProfiles: { likedUserId } } },
  );
};

const getReceivedLikes = async userId => {
  const data = await User.findOne({ userId }, 'receivedLikes');
  if (!data) throw new Error('User not found');

  const receivedLikes = data.receivedLikes || [];
  return Promise.all(
    receivedLikes.map(async like => {
      const userData = await User.findOne(
        { userId: like.userId },
        'userId firstName imageUrls prompts',
      );
      const user = userData
        ? {
            userId: userData.userId,
            firstName: userData.firstName,
            imageUrls: userData.imageUrls || null,
            prompts: userData.prompts,
          }
        : { userId: like.userId, firstName: null, imageUrl: null };

      return { ...(like.toObject ? like.toObject() : like), userId: user };
    }),
  );
};

const createMatch = async (currentUserId, selectedUserId) => {
  const currentUser = await User.findOne({ userId: currentUserId });
  const selectedUser = await User.findOne({ userId: selectedUserId });

  if (!currentUser || !selectedUser) throw new Error('User not found');

  const indexToRemove = currentUser.receivedLikes.findIndex(
    like => like.userId == selectedUserId,
  );
  if (indexToRemove == -1)
    throw new Error('Selected User not found in receivedLikes');

  const index = selectedUser.likedProfiles.findIndex(
    profile => profile.likedUserId == currentUserId,
  );
  if (index == -1) throw new Error('Current user not in likedProfiles');

  await Promise.all([
    User.updateOne(
      { userId: selectedUserId },
      {
        $push: { matches: currentUserId },
        $pull: { likedProfiles: { likedUserId: currentUserId } },
      },
    ),
    User.updateOne(
      { userId: currentUserId },
      {
        $push: { matches: selectedUserId },
        $pull: { receivedLikes: { userId: selectedUserId } },
      },
    ),
  ]);
};

const getMatchedUsers = async userId => {
  const user = await User.findOne({ userId }, 'matches');
  const matches = user?.matches || [];
  if (!matches.length) return [];

  return User.find(
    { userId: { $in: matches } },
    'userId firstName imageUrls prompts',
  );
};

const subscribeUser = async (userId, plan, type) => {
  const startDate = new Date().toISOString();
  let duration = 180;
  if (plan?.plan === '1 week') duration = 7;
  else if (plan?.plan === '1 month') duration = 30;
  else if (plan?.plan === '3 months') duration = 90;

  const endDate = dayjs(startDate).add(duration, 'day').toISOString();
  const paymentId = crypto.randomUUID();

  const newSubscription = {
    subscriptionId: paymentId,
    planName: plan.plan,
    price: plan.price,
    plan: type,
    startDate: startDate,
    endDate: endDate,
    status: 'active',
  };

  await User.updateOne(
    { userId },
    { $push: { subscriptions: newSubscription } },
  );
};

const updateRoses = async (userId, rosesToAdd) => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error('User not found');

  user.roses += Number(rosesToAdd);
  await user.save();
};

const sendRose = async (userId, likedUserId, image, comment, type, prompt) => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error('User not found');

  const rosesRemaining = user.roses;
  if (rosesRemaining <= 0) throw new Error('No roses remaining');

  user.roses -= 1;
  await user.save();

  let newLike = { userId, type, category: 'Rose' };
  if (type === 'image') {
    if (!image) throw new Error('Image URL is required');
    newLike.image = image;
  } else if (type === 'prompt') {
    if (!prompt || !prompt.question || !prompt.answer)
      throw new Error('Prompts are required');
    newLike.prompt = prompt;
  }
  if (comment) newLike.comment = comment;

  await User.updateOne(
    { userId: likedUserId },
    { $push: { receivedLikes: newLike } },
  );
  await User.updateOne(
    { userId },
    { $push: { likedProfiles: { likedUserId } } },
  );
};

module.exports = {
  likeProfile,
  getMatchesForUser,
  getUserInfo,
  getReceivedLikes,
  createMatch,
  getMatchedUsers,
  subscribeUser,
  updateRoses,
  sendRose,
};
