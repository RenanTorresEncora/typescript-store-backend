import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = express.Router();

// GET
router.get('/', (req, res) => {
  readFile('./database/userCart.json').then((data) => {
    const parsedData = JSON.parse(data);
    res.status(200).json(parsedData.userCart.products);
  });
});

// POST
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const { userCart } = req.body;
  readFile('./database/userCart.json').then((data) => {
    const db = JSON.parse(data);
    if (db.userId ===  Number(userId)) {
      db.userCart = userCart;
      writeFile('./database/userCart.json', JSON.stringify(db)).then(() => {
        res.status(201).json({ success: true, message: 'POST successful' });
      });
    } else {
      res
      .status(400)
      .json({ success: false, message: `No such user with ID: ${userId}` });
    }
  });
});

export default router;
