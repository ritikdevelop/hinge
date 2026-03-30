const authService = require('../service/auth.service');


const register = async (req, res) => {
    try {
        const userData = req.body;
        console.log('Data', userData);
        const { token } = await authService.registerUser(userData);
        res.status(200).json({ token });
    } catch (error) {
        console.log('Error creating user', error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const { token } = await authService.loginUser(email, password);
    res.status(200).json({token, IdToken: token, AccessToken: token});
  } catch (error) {
    console.log('Error', error);
    if (error.message === 'User not found') {
      return res.status(404).json({error: 'User not found'});
    } else if (error.message === 'Invalid or incorrect password') {
      return res.status(403).json({error: 'Invalid or incorrect password'});
    }
    return res.status(500).json({message: 'Interval server error'});
  }
};

module.exports = { register, login };