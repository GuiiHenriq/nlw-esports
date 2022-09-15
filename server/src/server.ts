import express from 'express';

const app = express();

// List Game
app.get('/games', (req, res) => {
  return res.json([]);
});

// Create AD
app.post('/ads', (req, res) => {
  return res.json([]);
});

// List Ads by Game
app.get('/games/:id/ads', (req, res) => {
  //const gameId = req.params.id;

  return res.json([]);
});

// Get Discord by Ad
app.get('/ads/:id/discord', (req, res) => {
  //const adId = req.params.id;

  return res.json([]);
});

app.listen(8888);
