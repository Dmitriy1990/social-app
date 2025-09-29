import { verifyAccessToken } from './auth.js';

export function authenticate(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) {
    return res.status(401).json({ message: 'Missing access token' });
  }
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid access token' });
  }
}
