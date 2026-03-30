const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(404).json({
            message: 'Token is required'
        });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token Received: ', token);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid token'
            });
        }
        req.user = user;
        next();
    });
};

module.exports = authentication;