import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Secret key for JWT 
const SECRET_KEY = 'THEKEYISVERYMUCHSECRET';

import { users } from '../data/users.js';

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// User data endpoint
router.get('/user', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const userData = users.find(u => u.id === user.id);
      res.json({ user: userData });
    });
  } else {
    res.sendStatus(401);
  }
});

export default router;
