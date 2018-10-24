import axios from 'axios';
import client from './redis';
import { logger } from '../services/Logger';

class Client {
  constructor() {
    this.props = {
      baseUrl: 'https://api.spotify.com/v1',
      time_range: 'medium_term',
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

  async getApi(url, token) {
    const instance = axios.create({
      headers: { Authorization: 'Bearer ' + token },
    });

    const response = await instance.get(url);

    return response;
  }

  async get(url, token, type) {
    let response;
    const key = type === 'top' ? `${url}${token}` : `${url}-similar`;

    try {
      response = await this.getCache(key);
    } catch (e) {
      throw e;
    }

    if (response === null) {
      logger('from api');
      try {
        response = await this.getApi(url, token);
        // Rewrite!
        response = type === 'top' ? response.data.items : response.data.artists;
      } catch (e) {
        logger(e);
        throw e;
      }
      client.set(key, JSON.stringify(response));
      client.expire(key, 7 * 24 * 60 * 60);
      // client.expire(`${url}${token}`, 30);
    } else {
      logger('from cache');
    }

    return response;
  }

  async topBands(token) {
    const { baseUrl, time_range } = this.props;

    const topBands = [];

    try {
      const endpoint = `me/top/artists?limit=100&time_range=${time_range}`;
      const url = `${baseUrl}/${endpoint}`;
      const response = await this.get(url, token, 'top');
      topBands.push(...response);
    } catch (e) {
      throw e;
    }

    return topBands;
  }

  async similarBands(ids, token) {
    const { baseUrl } = this.props;
    // get array of promises
    const promises = ids.map(async id => {
      try {
        const endpoint = `artists/${id}/related-artists`;
        const url = `${baseUrl}/${endpoint}`;
        const response = await this.get(url, token, 'similar');
        return response;
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
      const notInTop = ids.indexOf(band.id) === -1;
      // return only if band not in list of similar or top bands
      return notInSimilar && notInTop ? [...carry, band] : carry;
    }, []);

    return similarBands;
  }
}

module.exports = new Client();
