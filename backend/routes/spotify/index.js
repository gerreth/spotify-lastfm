import express from 'express';

import client from '../../clients/spotify';
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
    let topBands = await client.topBands(req.body.token);

    topBands = BandsTransformer.fromSpotify(topBands);

    UserController.top('spotify', topBands);

    return res.send(topBands);
  }),
);

router.post(
  '/similar-bands',
  wrapAsync(async (req, res) => {
    let similarBands = await client.similarBands(req.body.ids, req.body.token);

    similarBands = BandsTransformer.fromSpotify(similarBands);

    UserController.similar('spotify', similarBands);

    return res.send(similarBands);
  }),
);

module.exports = router;
