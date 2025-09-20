import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
});

export const User = mongoose.model('User', userSchema);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Работа с профилем пользователя
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Получить профиль пользователя
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Данные профиля
 *       401:
 *         description: Неавторизован
 */
