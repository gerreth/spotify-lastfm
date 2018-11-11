import express from 'express';

import client from '../../clients/lastfm';
import UserController from '../../controllers/userController';
import BandsTransformer from '../../services/BandsTransformer';

const router = express.Router();

const wrapAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/* GET home page. */
router.get('/', (req, res) => {
  res.send('response');
});

router.post(
  '/top-bands',
  wrapAsync(async (req, res) => {
    let topBands = await client.topBands('gereeet');

    topBands = BandsTransformer.fromLastfm(topBands);

    UserController.top('lastfm', topBands);

    return res.send(topBands);
  }),
);

router.post(
  '/similar-bands',
  wrapAsync(async (req, res) => {
    let similarBands = await client.similarBands(req.body.names);

    similarBands = BandsTransformer.fromLastfm(similarBands);

    UserController.similar('lastfm', similarBands);

    return res.send(similarBands);
  }),
);

module.exports = router;
