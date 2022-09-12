import express from 'express';

const app = express();

app.get('/ads', (req, res) => {
  return res.json([
    {
      id: 1,
      name: 'AD #1',
    },
    {
      id: 2,
      name: 'AD #2',
    },
    {
      id: 3,
      name: 'AD #3',
    },
  ]);
});

app.listen(8888);
