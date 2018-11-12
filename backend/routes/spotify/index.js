import express from 'express';

import wrapAsync from '../../utils/wrapAsync';

import spotifyClient from '../../clients/spotify';
import UserController from '../../controllers/userController';
import BandsTransformer from '../../services/BandsTransformer';

const router = express.Router();

// Redis cache
import client from '../../clients/redis';

const cache = () => {
  return (req, res, next) => {
    console.log(req);
    // client.get(url, (error, result) => {
    //   resolve(JSON.parse(result));
    // });

    res.sendStatus = res.send;
    res.send = body => {
      console.log('caching!!!');
      res.sendStatus(body);
    };
    next();
  };
};

/* GET home page. */
router.get('/', (req, res) => {
  res.send('response');
});

router.post(
  '/top-bands',
  cache(),
  wrapAsync(async (req, res) => {
    let topBands = await spotifyClient.topBands(req.body.token);

    topBands = BandsTransformer.fromSpotify(topBands);

    UserController.top('spotify', topBands);

    return res.send(topBands);
  }),
);

router.post(
  '/similar-bands',
  cache(),
  wrapAsync(async (req, res) => {
    let similarBands = await spotifyClient.similarBands(
      req.body.ids,
      req.body.token,
    );

    similarBands = BandsTransformer.fromSpotify(similarBands);

    UserController.similar('spotify', similarBands);

    return res.send(similarBands);
  }),
);

module.exports = router;
