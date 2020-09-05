const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD,OPTIONS, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method.toLocaleLowerCase() === 'options') {
    return res.end();
  }
  next();
});

app.use(bodyParser.json());

const secret = 'garen';
app.get('/test', (req, res) => {
  res.send({ test: 'test' });
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (username === 'admin') {
    res.json({
      code: 0,
      username: 'admin',
      token: jwt.sign({ username: 'admin' }, secret, {
        expiresIn: 20,
      }),
    });
  } else {
    res.json({
      code: 1,
      data: '用户名不存在',
    });
  }
});

app.get('/validate', (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return res.json({
        code: 1,
        data: 'token失效了',
      });
    }
    res.json({
      username: decode.username,
      code: 0,
      token: jwt.sign({ username: 'admin' }, secret, {
        expiresIn: 20,
      }),
    });
  });
});

app.listen(3000, () => {
  console.log('server start at http://localhost:3000');
});
