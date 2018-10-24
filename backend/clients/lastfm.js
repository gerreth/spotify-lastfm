import axios from 'axios';
import client from './redis';
import { logger } from '../services/Logger';

class Client {
  constructor() {
    this.props = {
      baseUrl: 'http://ws.audioscrobbler.com/2.0',
      period: '6month',
      token: process.env.LASTFM_API_KEY,
    };
  }

  async resolveAll(promises) {
    return Promise.all(promises).then(result => result);
  }

  async getCache(url) {
    return new Promise((resolve, reject) => {
      client.get(url, (error, result) => {
        resolve(JSON.parse(result));
      });
    });
  }

  async getApi(url) {
    try {
      const response = await axios.get(url);
      return response;
    } catch (e) {
      logger(e);
      throw e;
    }
  }

  async get(url, type) {
    let response;

    try {
      response = await this.getCache(url);
    } catch (e) {
      logger(e);
      throw e;
    }

    if (response === null) {
      logger('from api');
      try {
        response = await this.getApi(url);
        response = response.data[type];
      } catch (e) {
        logger(e);
        throw e;
      }

      if (response) {
        client.set(url, JSON.stringify(response));
        client.expire(url, 7 * 24 * 60 * 60);
      }
    } else {
      logger('from cache');
    }

    return response || [];
  }

  async topBands(user) {
    const { baseUrl, period, token } = this.props;

    let page = 1;
    let pages = 1;
    const topBands = [];

    // limit to top 100
    while (page <= pages && page <= 1) {
      try {
        const url = `${baseUrl}/?method=user.gettopartists&user=${user}&api_key=${token}&period=${period}&format=json&page=${page}`;
        const response = await this.get(url, 'topartists');

        topBands.push(...response.artist);
        pages = parseInt(response['@attr'].totalPages);
      } catch (e) {
        logger(e);
        throw e;
      }

      page++;
    }

    return topBands;
  }

  async similarBands(names) {
    const { baseUrl, token } = this.props;

    // get array of promises
    const promises = names.map(async name => {
      try {
        const url = `${baseUrl}/?method=artist.getsimilar&artist=${name}&api_key=${token}&limit=25&format=json`;
        const response = await this.get(url, 'similarartists');
        return response.artist;
      } catch (e) {
        logger(e);
        throw e;
      }
    });

    // resolves the array of promises
    const results = await this.resolveAll(promises);

    // flattens array and removes undefinedsfile
    const result = results.reduce(
      (carry, item) => (item === undefined ? carry : [...carry, ...item]),
      [],
    );

    // check for duplicates
    const similarBands = result.reduce((carry, band) => {
      const notInSimilar =
        carry.find(item => item.name === band.name) === undefined;
      const notInTop = names.indexOf(band.name) === -1;
      // return only if band not in list of similar or top bands
      return notInSimilar && notInTop ? [...carry, band] : carry;
    }, []);

    return similarBands;
  }
}

module.exports = new Client();
