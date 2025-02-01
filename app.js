import express from 'express';

const app = express();
const port = 8000;

app.listen(port, () => {});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
