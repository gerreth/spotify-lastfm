import express from 'express';

import client from '../../clients/spotify';
import UserController from '../../controllers/userController';
import BandsTransformer from '../../services/BandsTransformer';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('response');
});

router.post('/top-bands', async (req, res) => {
  let topBands;

  try {
    topBands = await client.topBands(req.body.token);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }

  topBands = BandsTransformer.fromSpotify(topBands);

  UserController.top('spotify', topBands);

  return res.send(topBands);
});

router.post('/similar-bands', async (req, res) => {
  let similarBands;

  try {
    similarBands = await client.similarBands(req.body.ids, req.body.token);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }

  similarBands = BandsTransformer.fromSpotify(similarBands);

  UserController.similar('spotify', similarBands);

  return res.send(similarBands);
});

module.exports = router;
