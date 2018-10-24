import express from 'express';

import client from '../../clients/lastfm';
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
    topBands = await client.topBands('gereeet');
  } catch (e) {
    res.status(400);
    return res.send(e);
  }

  topBands = BandsTransformer.fromLastfm(topBands);

  UserController.top('lastfm', topBands);

  return res.send(topBands);
});

router.post('/similar-bands', async (req, res) => {
  let similarBands;

  try {
    similarBands = await client.similarBands(req.body.names);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }

  similarBands = BandsTransformer.fromLastfm(similarBands);

  UserController.similar('lastfm', similarBands);

  return res.send(similarBands);
});

module.exports = router;
