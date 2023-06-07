import jwt from  'jsonwebtoken';


// // Sample middleware function for token validation
// function authenticateToken(req, res, next) {
//   // Get the token from the request header
//   const token = req.headers.authorization;

//   if (!token) {
//     // If the token is missing, return an error response
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   try {
//     // Verify and decode the token
//     const decoded = jwt.verify(token, 'Signinappsecret');

//     // You can perform additional checks on the decoded token
//     // For example, check if the token is expired, validate issuer, audience, etc.

//     // If everything is valid, you can pass the decoded token to the next middleware
//     req.user = decoded;

//     // Call the next middleware function
//     next();
//   } catch (error) {
//     // If there's an error during token verification, return an error response
//     return res.status(403).json({ error: 'Invalid token' });
//   }
// }

// // Example usage of the middleware function
// app.get('/protected-route', authenticateToken, (req, res) => {
//   // If the token is valid, the middleware function will pass the decoded token in `req.user`
//   // You can access the user's information and process the request
//   res.json({ message: 'Access granted to protected route', user: req.user });
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

export function checkToken(token){
    const arr=token.split(" ")
    console.log(arr[1])
    const decoded = jwt.verify(arr[1], 'Signinappsecret');
    console.log(decoded)
    return decoded

}
