import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req, res, next) => {
  const headerToken = req.header('Authorization')?.replace('Bearer ', '');
  const cookieToken = req.cookies?.token;
  const token = headerToken || cookieToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log('Invalid token:', ex);
    res.status(400).send({ error: 'Invalid token.' });
  }
};
export default auth;
