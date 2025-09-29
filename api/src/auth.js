import jwt from 'jsonwebtoken';
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

function signAccessToken(userId) {
  return jwt.sign({ id: userId.toString() }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
}

function signRefreshToken(userId) {
  return jwt.sign({ id: userId.toString() }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
}
function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

export { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Авторизация и токены
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: name
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Ошибка регистрации
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: name
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Авторизация успешна (access token в ответе, refresh в httpOnly cookie)
 *       401:
 *         description: Неверные данные
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Обновление access-токена по refresh-токену
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Новый access-токен
 *       401:
 *         description: Недействительный refresh-токен
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Выход пользователя (удаление refresh-токена)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Успешный выход
 */
