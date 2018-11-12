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

  async getApi(url, token) {
    const instance = axios.create({
      headers: { Authorization: 'Bearer ' + token },
    });

    const response = await instance.get(url);

    return response;
  }

  async get(url, token) {
    let response;

    logger('from api');
    try {
      response = await this.getApi(url, token);
      response = response.data.artists;
    } catch (e) {
      logger(e);
      throw e;
    }
    client.set(url, JSON.stringify(response));
    client.expire(url, 7 * 24 * 60 * 60);

    return response;
  }

  async topBands(token) {
    const { baseUrl, time_range } = this.props;

    const topBands = [];

    const endpoint = `me/top/artists?limit=100&time_range=${time_range}`;
    const url = `${baseUrl}/${endpoint}`;
    try {
      const response = await this.getApi(url, token);
      topBands.push(...response.data.items);
    } catch (e) {
      throw e;
    }

    return topBands;
  }

  async similarBands(ids, token, bands) {
    const { baseUrl } = this.props;

    // get array of promises
    const promises = ids.map(async id => {
      const endpoint = `artists/${id}/related-artists`;
      const url = `${baseUrl}/${endpoint}`;
      try {
        const response = await this.get(url, token);
        return response;
      } catch (e) {
        logger(e);
        throw e;
      }
    });

    // resolves the array of promises
    const results = await this.resolveAll(promises);

    // flattens array and removes undefinedsfile
    const result = [...results, ...bands].reduce(
      (carry, item) => (item === undefined ? carry : [...carry, ...item]),
      [],
    );

    // check for duplicates
    const similarBands = result.reduce((carry, band) => {
      const notInSimilar = carry.every(item => item.name !== band.name);
      const notInTop = ids.indexOf(band.id) === -1;
      // return only if band not in list of similar or top bands
      return notInSimilar && notInTop ? [...carry, band] : carry;
    }, []);

    return similarBands;
  }
}

module.exports = new Client();
