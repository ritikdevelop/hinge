const userService = require('../service/user.service');

const getUserInfo = async (req, res) => {
  const { userId } = req.query;
  console.log('User ID', userId);

  if (!userId) {
    return res.status(400).json({ message: 'User id is required' });
  }

  try {
    const user = await userService.getUserInfo(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log('Error fetching user details', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getMatches = async (req, res) => {
  const { userId } = req.query;
  try {
    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }

    const matches = await userService.getMatchesForUser(userId);
    res.status(200).json({ matches });
  } catch (error) {
    console.log('Error fetching matches', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const likeProfile = async (req, res) => {
  const { userId, likedUserId, image, comment = null, type, prompt } = req.body;

  if (req.user.userId !== userId) {
    return res.status(403).json({ message: 'unauthorized action' });
  }
  if (!userId || !likedUserId) {
    return res.status(404).json({ message: 'Missing required parametered' });
  }

  try {
    await userService.likeProfile(
      userId,
      likedUserId,
      image,
      comment,
      type,
      prompt,
    );
    res.status(200).json({ message: 'Profile Likes successfully!' });
  } catch (error) {
    console.log('Error liking', error);
    if (error.message === 'User not found')
      return res.status(404).json({ message: 'User not found' });
    if (error.message === 'Daily like limit reached')
      return res
        .status(403)
        .json({
          message:
            'Daily like limit reached, please subscribe or try again tomorrow',
        });
    if (
      error.message === 'Image url is required' ||
      error.message === 'Prompts are required'
    )
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getReceivedLikes = async (req, res) => {
  const { userId } = req.params;
  console.log('User', userId);

  try {
    const enrichedLikes = await userService.getReceivedLikes(userId);
    res.status(200).json({ receivedLikes: enrichedLikes });
  } catch (error) {
    console.log('Error getting the likes');
    if (error.message === 'User not found')
      return res.status(404).json({ message: 'User not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createMatch = async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;
    await userService.createMatch(currentUserId, selectedUserId);
    res.status(200).json({ message: 'Match created successfully!' });
  } catch (error) {
    console.log('Error creating a match', error);
    if (error.message === 'User not found')
      return res.status(404).json({ message: 'User not found' });
    if (error.message.includes('not found') || error.message.includes('not in'))
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getMatchedUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    const matches = await userService.getMatchedUsers(userId);
    res.status(200).json({ matches });
  } catch (error) {
    console.log('Error getting matches', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const subscribe = async (req, res) => {
  const { userId, plan, type } = req.body;

  if (!userId || !plan) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await userService.subscribeUser(userId, plan, type);
    res.status(200).json({ message: 'Subscription saved successfully!' });
  } catch (error) {
    console.log('ERROR subscribing', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const paymentSuccess = async (req, res) => {
  try {
    const { userId, rosesToAdd } = req.body;
    await userService.updateRoses(userId, rosesToAdd);
    return res
      .status(200)
      .json({ message: 'Payment successful and roses updated' });
  } catch (error) {
    console.log('Error', error);
    if (error.message === 'User not found')
      return res.status(404).json({ message: 'User not found' });
    return res.status(500).json({ message: 'Interval server error' });
  }
};

const sendRose = async (req, res) => {
  const { userId, likedUserId, image, comment = null, type, prompt } = req.body;

  if (req.user.userId !== userId) {
    return res.status(403).json({ message: 'Unauthorized action' });
  }

  if (!userId) {
    return res.status(400).json({ message: 'Missing req parameters' });
  }

  try {
    await userService.sendRose(
      userId,
      likedUserId,
      image,
      comment,
      type,
      prompt,
    );
    res.status(200).json({ message: 'Rose sent successfully' });
  } catch (error) {
    console.log('Error', error);
    if (error.message === 'User not found')
      return res.status(404).json({ message: 'User not found' });
    if (error.message === 'No roses remaining')
      return res.status(403).json({ message: 'No roses remaining to send' });
    if (error.message.includes('required'))
      return res.status(400).json({ message: error.message });
    return res.status(500).json({ message: 'Interval server error' }); // Kept Interval from orig code
  }
};

module.exports = {
  getReceivedLikes,
  createMatch,
  getMatchedUsers,
  subscribe,
  paymentSuccess,
  sendRose,
  likeProfile,
  getUserInfo,
  getMatches,
};
