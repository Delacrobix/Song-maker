import express from 'express';

const router = express.Router();

router.get('/api/test', (req, res) => {
s
  res.send("synth");
});

module.exports = router;