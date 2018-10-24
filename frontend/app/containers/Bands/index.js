/*
 * Bands
 */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import TopBand from 'components/TopBand';
import SimilarBand from 'components/SimilarBand';

import { spotify, lastfm } from './gereeet';
import { allBandsSelector } from './selectors';
import { BandsWrapper } from './styled';

class Bands extends React.Component {
  render() {
    console.log({ spotify, lastfm });

    // const topUniqueSpotify = spotify.bands.top
    //   .reduce((bands, band) => {
    //     const lasftmBands = lastfm.bands.top.map(band => band.toLowerCase());
    //     if (lasftmBands.indexOf(band.toLowerCase()) === -1) {
    //       bands.push(band);
    //     }
    //     return bands;
    //   }, [])
    //   .sort();

    // const topUniqueLastfm = lastfm.bands.top
    //   .reduce((bands, band) => {
    //     const spotifyBands = spotify.bands.top.map(band => band.toLowerCase());
    //     if (spotifyBands.indexOf(band.toLowerCase()) === -1) {
    //       bands.push(band);
    //     }
    //     return bands;
    //   }, [])
    //   .sort();

    // console.log({ topUniqueSpotify, topUniqueLastfm });

    const similarUniqueSpotify = spotify.bands.similar
      .reduce((bands, band) => {
        const lasftmBands = lastfm.bands.similar.map(band =>
          band.toLowerCase(),
        );
        const lasftmTopBands = lastfm.bands.top.map(band => band.toLowerCase());
        if (
          lasftmBands.indexOf(band.toLowerCase()) === -1 &&
          lasftmTopBands.indexOf(band.toLowerCase()) === -1
        ) {
          bands.push(band);
        }
        return bands;
      }, [])
      .sort();

    const similarUniqueLastfm = lastfm.bands.similar
      .reduce((bands, band) => {
        const spotifyBands = spotify.bands.similar.map(band =>
          band.toLowerCase(),
        );
        const spotifyTopBands = spotify.bands.top.map(band =>
          band.toLowerCase(),
        );
        if (
          spotifyBands.indexOf(band.toLowerCase()) === -1 &&
          spotifyTopBands.indexOf(band.toLowerCase()) === -1
        ) {
          bands.push(band);
        }
        return bands;
      }, [])
      .sort();

    console.log({ similarUniqueSpotify, similarUniqueLastfm });

    const top = this.props.bands.top.map(band => {
      if (band.id || band.mbid === '75167b8b-44e4-407b-9d35-effe87b223cf') {
        console.log('DUPLICATES');
        console.log({ band });
      }
      if (band.id || band.mbid === '07a17571-81fc-4cf8-a634-98f0d926d313') {
        console.log('DUPLICATES');
        console.log({ band });
      }

      return (
        <TopBand
          key={`${band.name}-${band.id || band.mbid}`}
          name={band.name}
          image={band.image}
        />
      );
    });

    const similar = this.props.bands.similar
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
      .map(band => {
        if (band.id || band.mbid === '75167b8b-44e4-407b-9d35-effe87b223cf') {
          console.log('DUPLICATES');
          console.log({ band });
        }
        if (band.id || band.mbid === '07a17571-81fc-4cf8-a634-98f0d926d313') {
          console.log('DUPLICATES');
          console.log({ band });
        }

        return (
          <SimilarBand
            key={`${band.name}-${band.id || band.mbid}`}
            name={band.name}
            image={band.image}
          />
        );
      });

    return (
      <div>
        <div style={{ display: 'none' }}>
          <div>
            <b>Lastfm</b>
            {similarUniqueLastfm.map(band => {
              return (
                <p
                  onClick={event => {
                    console.log(event.target);
                    event.target.style.background = 'red';
                  }}
                >
                  {band}
                </p>
              );
            })}
          </div>
          <div>
            <b>Spotify</b>
            {similarUniqueSpotify.map(band => {
              return (
                <p
                  onClick={event => {
                    console.log(event.target);
                    event.target.style.background = 'red';
                  }}
                >
                  {band}
                </p>
              );
            })}
          </div>
        </div>
        <BandsWrapper>{top}</BandsWrapper>
        <BandsWrapper>{similar}</BandsWrapper>
      </div>
    );
  }
}

Bands.propTypes = {
  bands: PropTypes.shape({
    similar: PropTypes.array,
    top: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  bands: allBandsSelector(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Bands);
