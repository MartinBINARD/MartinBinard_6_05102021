const jwt = require('jsonwebtoken');

// CHECK GIVEN TOKEN & USER ID
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.plit(' ')[1];
        const decodedToken =jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        if(req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID !';
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json({ error: error | 'unauthenticated request !' })
    }
}