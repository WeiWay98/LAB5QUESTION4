const express = require('express');
const router = express.Router();

// Sample friends data (replace it with your data)
let friends = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  // Add more friends as needed
];

// Part 1: Filter friends by starting letter
router.get('/filter', (req, res) => {
  const { letter } = req.query;
  if (letter) {
    const filteredFriends = friends.filter(friend => friend.name.startsWith(letter));
    res.json(filteredFriends);
  } else {
    res.status(400).json({ error: 'Missing or invalid letter parameter' });
  }
});

// Part 2: Return specific headers in the 'info' route
router.get('/info', (req, res) => {
  const headersInfo = {
    'User-Agent': req.get('User-Agent'),
    'Content-Type': req.get('Content-Type'),
    'Accept': req.get('Accept'),
  };
  res.json(headersInfo);
});

// Part 3: Return a single friend by ID
router.get('/:id', (req, res) => {
  const friendId = parseInt(req.params.id);
  const friend = friends.find(f => f.id === friendId);
  if (friend) {
    res.json(friend);
  } else {
    res.status(404).json({ error: 'Friend not found' });
  }
});

// Part 4: Update data for an existing friend by ID (using PUT)
router.put('/:id', (req, res) => {
  const friendId = parseInt(req.params.id);
  const { name, age } = req.body;
  const index = friends.findIndex(f => f.id === friendId);
  if (index !== -1 && name && age) {
    friends[index] = { id: friendId, name, age };
    res.json({ message: 'Friend updated successfully', friend: friends[index] });
  } else {
    res.status(400).json({ error: 'Invalid data or friend not found' });
  }
});

module.exports = router;