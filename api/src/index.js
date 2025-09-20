import { config } from 'dotenv';
import express from 'express';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './db.js';
import { User } from './models/User.js';
import { RefreshToken } from './models/RefreshToken.js';
import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from './auth.js';
import { authenticate } from './middleware.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

config();
connectDB();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post('/auth/register', async (req, res) => {
  console.log('req.body', req.body);
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'username & password required' });

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash });

  res.status(201).json({ id: user._id, username: user.username });
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = signAccessToken({ id: user._id, username: user.username });
  const refreshToken = signRefreshToken({ id: user._id });

  await RefreshToken.create({ token: refreshToken, userId: user._id });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

app.post('/auth/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(400).json({ message: 'refreshToken cookie missing' });

  const stored = await RefreshToken.findOne({ token: refreshToken });
  if (!stored) return res.status(403).json({ message: 'Refresh token revoked or unknown' });

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const newAccessToken = signAccessToken({ id: user._id, username: user.username });
    const newRefreshToken = signRefreshToken({ id: user._id });

    await RefreshToken.deleteOne({ token: refreshToken });
    await RefreshToken.create({ token: newRefreshToken, userId: user._id });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});

app.post('/auth/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
    res.clearCookie('refreshToken');
  }
  res.json({ message: 'Logged out' });
});

app.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
