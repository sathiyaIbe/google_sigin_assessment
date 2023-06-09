import jwt from 'jsonwebtoken';
const {verify} = jwt;
const accessTokenSecret = 'Signinappsecret';
const authenticateJWT = (req, res, next) => {
    const authHeader =req.headers.authorization;
    if (authHeader) {        
        const token = authHeader.split(' ')[1];

        verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(403).json({error:"Need Authentication  to access"});
    }
}
export {authenticateJWT}
