const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
  req.headers['User-agent'] = 'birkan9977'
});
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello!!! From Express' });
});

app.get('/api/github', (req, res) => {
  console.log(req.headers['user-agent'])
  request(
    { url: 'https://api.github.com/search/repositories?q=language:swift+sort:stars' },
    (error, response, body) => {
      /*
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }*/

      res.json(body);
    }
  )
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));