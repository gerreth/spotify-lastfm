class BandsTransformer {
  fromSpotify(bands) {
    const getImage = band => {
      try {
        return band.images.reduce(
          (carry, item) => (item.width > carry.width ? item : carry),
          band.images[0],
        );
      } catch (e) {
        console.debug('Error: BandsTransformer -> fromSpotify() -> getImage()');
        return {
          height: 0,
          url: null,
          size: null,
          width: 0,
        };
      }
    };

    const example = {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/2EfFOe92ZZHE2lpappD8js',
      },
      followers: { href: null, total: 26359 },
      genres: ['freak folk', 'indie garage rock', 'neo-psychedelic'],
      href: 'https://api.spotify.com/v1/artists/2EfFOe92ZZHE2lpappD8js',
      id: '2EfFOe92ZZHE2lpappD8js',
      images: [
        {
          height: 488,
          url:
            'https://i.scdn.co/image/736d5a96d3d818724578cd109b7b9b9b3cab93a6',
          width: 475,
        },
        {
          height: 205,
          url:
            'https://i.scdn.co/image/12309d67f6d937e84a14cf4fb352e040051ef50f',
          width: 200,
        },
        {
          height: 66,
          url:
            'https://i.scdn.co/image/c47d0590c84d413e2413cc8a9551b18e7758e6e7',
          width: 64,
        },
      ],
      name: 'Mystic Braves',
      popularity: 44,
      type: 'artist',
      uri: 'spotify:artist:2EfFOe92ZZHE2lpappD8js',
    };

    return bands.map(band => {
      return {
        name: band.name,
        image: getImage(band),
        id: band.id,
        mbid: null,
      };
    });
  }

  fromLastfm(bands) {
    const getImage = band => {
      try {
        return band.image.reduce(
          (carry, item) => {
            const sizes = [
              '',
              'small',
              'medium',
              'large',
              'extralarge',
              'mega',
            ];
            const newItem =
              sizes.indexOf(item.size) > sizes.indexOf(carry.size)
                ? item
                : carry;

            return {
              height: 0,
              url: newItem['#text'] || newItem.url,
              size: newItem['size'] || null,
              width: 0,
            };
          },
          {
            height: 0,
            url: band.image[0]['#text'] || null,
            size: band.image[0]['size'] || null,
            width: 0,
          },
        );
      } catch (e) {
        console.debug('Error: BandsTransformer -> fromLastfm() -> getImage()');
        return {
          height: 0,
          url: null,
          size: null,
          width: 0,
        };
      }
    };

    const example = {
      name: 'The Holydrug Couple',
      playcount: '1',
      mbid: 'ab722b70-b4a8-4918-b13d-2a449f23df16',
      url: 'https://www.last.fm/music/The+Holydrug+Couple',
      streamable: '0',
      image: [
        {
          '#text':
            'https://lastfm-img2.akamaized.net/i/u/34s/425a1faf9d394232bf5421a3783eacf1.png',
          size: 'small',
        },
        {
          '#text':
            'https://lastfm-img2.akamaized.net/i/u/64s/425a1faf9d394232bf5421a3783eacf1.png',
          size: 'medium',
        },
        {
          '#text':
            'https://lastfm-img2.akamaized.net/i/u/174s/425a1faf9d394232bf5421a3783eacf1.png',
          size: 'large',
        },
        {
          '#text':
            'https://lastfm-img2.akamaized.net/i/u/300x300/425a1faf9d394232bf5421a3783eacf1.png',
          size: 'extralarge',
        },
        {
          '#text':
            'https://lastfm-img2.akamaized.net/i/u/300x300/425a1faf9d394232bf5421a3783eacf1.png',
          size: 'mega',
        },
      ],
      '@attr': { rank: '98' },
    };

    return bands.map(band => {
      return {
        name: band.name,
        image: getImage(band),
        id: null,
        mbid: band.mbid,
      };
    });
  }
}

module.exports = new BandsTransformer();
