import jwt from 'jsonwebtoken'
require('dotenv').config();

const verifyAccessToken = (req, res, next) => {
    let authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    let token = authHeader.split(' ')[1]
    try {
        let decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        );
        req.user = decoded.username;
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    next();
}

module.exports = {
    verifyAccessToken: verifyAccessToken,
}