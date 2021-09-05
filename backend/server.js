const express = require('express');

const app = express();

app.use(
  express.json({
    extended: false,
  })
);

app.get('/', (req, res) => res.send('Api Running'));

app.listen(5000, () => console.log('Listening on port 5000!'));
