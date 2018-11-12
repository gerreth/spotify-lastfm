import express from 'express';

import wrapAsync from '../../utils/wrapAsync';

import spotifyClient from '../../clients/spotify';
import UserController from '../../controllers/userController';
import BandsTransformer from '../../services/BandsTransformer';

const router = express.Router();

// Redis cache
import client from '../../clients/redis';

const resolveAll = async promises => {
  return Promise.all(promises).then(result => result);
};

const getCache = args => {
  const [times, unit] = args.split(' ');

  const units = {
    seconds: 1,
    minutes: 60,
    hours: 60 * 60,
    days: 24 * 60 * 60,
  };

  const cachingTime = times * units[unit];

  return async (req, res, next) => {
    const url = req._parsedOriginalUrl.pathname;

    const cached = await new Promise((resolve, reject) => {
      client.get(url, (error, result) => {
        resolve(JSON.parse(result));
      });
    });

    if (cached === null) {
      res.sendStatus = res.send;
      res.send = body => {
        client.set(url, JSON.stringify(body));
        client.expire(url, cachingTime);

        res.sendStatus(body);

        res.send(cached);
        next();
      };
    } else {
      res.send(cached);
    }
  };
};

const postCache = () => {
  return async (req, res, next) => {
    let ids = req.body.ids;

    const bandsPromises = await ids.map(async id => {
      const cached = await new Promise((resolve, reject) => {
        const key = `https://api.spotify.com/v1/artists/${id}/related-artists`;
        client.get(key, (error, result) => {
          resolve(JSON.parse(result));
        });
      });

      ids = ids.filter(_ => _ !== id);

      return cached;
    });

    const bands = await resolveAll(bandsPromises);

    req.bands = bands;
    req.ids = ids;

    next();
  };
};

/* GET home page. */
router.get('/', (req, res) => {
  res.send('response');
});

router.get(
  '/:user/top-bands',
  getCache('1 days'),
  wrapAsync(async (req, res) => {
    let topBands = await spotifyClient.topBands(req.query.token);

    topBands = BandsTransformer.fromSpotify(topBands);

    UserController.top('spotify', topBands);

    return res.send(topBands);
  }),
);

router.post(
  '/similar-bands',
  postCache(),
  wrapAsync(async (req, res) => {
    let similarBands = await spotifyClient.similarBands(
      req.ids,
      req.query.token,
      req.bands,
    );

    similarBands = BandsTransformer.fromSpotify(similarBands);

    UserController.similar('spotify', similarBands);

    return res.send(similarBands);
  }),
);

module.exports = router;
