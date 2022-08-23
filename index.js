import express from 'express';

const SERVER_PORT = 5000;
const app = express();

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}...`)
});
