const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const UserModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const saltRounds = 10;
const secret = 'hjwgshshhshjsxskkjsdddhhhgsjaeel51bccnmsnsahs51gsvhan';

// Initialize express and middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const userDoc = await UserModel.create({ username, password: hashedPassword });
        res.status(201).json(userDoc);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// Login endpoint

router.post('/login', async (req, res) => {
     const { username, password } = req.body;
    try {
        const userDoc = await UserModel.findOne({ username });
        if (!userDoc) return res.status(400).json("User not found");

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) return res.status(500).json({ error: err.message });
                res.cookie('token', token).json({
                    id:userDoc._id,
                    username,
                });
            });
        } else {
            res.status(400).json("Wrong credentials");
        }
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// Protected endpoint
router.get('/profile', async (req, res) => {
    const token = req.cookies.token; // Ensure token is correctly named and extracted from cookies
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      jwt.verify(token, secret, (err, info) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        res.json(info); // Respond with user info
      });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  });

  //logout
  router.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json('ok');
  });
  

module.exports = router;
