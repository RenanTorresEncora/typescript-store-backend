import express from 'express';
import cors from 'cors';
import userCart from './routes/userCart.js'

const SERVER_PORT = 5000;
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use([cors(corsOptions), express.json()]);

// UserCart router:
app.use('/api/v1/user/cart', userCart);

// 404 Requests:
app.all('*', (req, res) => {
  res.status(404).format({
    html: () => {
      res.send(
        `<html>
          <h1>404 - Resource not found</h1>
          <h3>Couldn't find resource "${req.url}" on server</h3>
        </html>`
      );
    },
    text: () => {
      res.send(
        `404 - Resource not found - Couldn't find resource "${req.url}" on server`
      );
    },
    json: () => {
      res.json({
        status: res.statusCode,
        url: req.url,
        message: "Resource not found - Couldn't find resource on server",
      });
    },
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}...`)
});
