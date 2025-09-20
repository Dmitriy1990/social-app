import mongoose from 'mongoose';

const refreshTokenSchema = mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  },
});

export const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
