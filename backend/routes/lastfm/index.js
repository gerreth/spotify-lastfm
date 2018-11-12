import express from 'express';

import wrapAsync from '../../utils/wrapAsync';

import lastfmClient from '../../clients/lastfm';
import UserController from '../../controllers/userController';
import BandsTransformer from '../../services/BandsTransformer';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('response');
});

router.post(
  '/top-bands',
  wrapAsync(async (req, res) => {
    let topBands = await lastfmClient.topBands('gereeet');

    topBands = BandsTransformer.fromLastfm(topBands);

    UserController.top('lastfm', topBands);

    return res.send(topBands);
  }),
);

router.post(
  '/similar-bands',
  wrapAsync(async (req, res) => {
    let similarBands = await lastfmClient.similarBands(req.body.names);

    similarBands = BandsTransformer.fromLastfm(similarBands);

    UserController.similar('lastfm', similarBands);

    return res.send(similarBands);
  }),
);

module.exports = router;
