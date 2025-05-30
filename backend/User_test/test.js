const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongo-memory-server');
const User = require('./models/User'); // Adjust path to your User model
const recommendationRouter = require('./routes/recommendations'); // Adjust path to your recommendations router
const jwt = require('jsonwebtoken');

// Mock Express app
const app = express();
app.use(express.json());
app.use('/recommendations', recommendationRouter);

// Mock MongoDB server
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  // Seed test data
  await User.create({
    _id: '1234567890abcdef12345678',
    username: 'testuser',
    preferences: { genres: ['fantasy'], authors: ['J.R.R. Tolkien'] },
  });
});

// Mock JWT verification
jest.mock('jsonwebtoken');
jwt.verify = jest.fn();

describe('GET /recommendations', () => {
  test('should return 404 for invalid user ID', async () => {
    // Mock token with invalid user ID
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 'invalid_user_id' });
    });

    const response = await request(app)
      .get('/recommendations')
      .set('Authorization', 'Bearer valid_token');

    expect(response.status).toBe(404);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('User not found');
  });

  test('should return 401 for missing token', async () => {
    const response = await request(app).get('/recommendations');

    expect(response.status).toBe(401);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('No token provided');
  });

  test('should return 401 for wrong token', async () => {
    // Mock invalid token
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    const response = await request(app)
      .get('/recommendations')
      .set('Authorization', 'Bearer invalid_token');

    expect(response.status).toBe(401);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Invalid token');
  });
});

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  preferences: {
    genres: [{ type: String }],
    authors: [{ type: String }],
  },
});

module.exports = mongoose.model('User', userSchema);

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Book = require('../models/Book');

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No token provided' });
  }
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    // Mock book query (assuming preferences are used to fetch books)
    const books = await Book.find({
      $or: [
        { genre: { $in: user.preferences.genres } },
        { author: { $in: user.preferences.authors } },
      ],
    }).limit(10);
    res.status(200).json({ status: 'success', recommendations: books });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;