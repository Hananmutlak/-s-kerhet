require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// Middleware للتحقق من JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// تسجيل مستخدم جديد
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const [userId] = await db('users').insert({
      username: req.body.username,
      password: hashedPassword
    });
    res.status(201).send({ id: userId });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// تسجيل الدخول
app.post('/login', async (req, res) => {
  const user = await db('users').where('username', req.body.username).first();
  if (!user) return res.status(400).send('User not found');
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');
  
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

// مسار محمي
app.get('/protected', authenticateToken, async (req, res) => {
  const user = await db('users').where('id', req.user.id).first();
  res.json({ message: `Welcome ${user.username}!`, user });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
app.get('/', (req, res) => {
  res.send('API is running. welcome to the API');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});