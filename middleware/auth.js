// middleware/auth.js
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).send('No token provided');
    }
  
    // Vous pouvez ajouter une vérification de token réelle ici
    // Par exemple : jwt.verify(token, secret, (err, decoded) => { ... });
  
    next();
  };
  
  module.exports = verifyToken;
  