/*
 * HomePage
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Loader from 'react-loader-spinner';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>

        <Loader type="Audio" color="#333" height="30" width="30" />
        <Loader type="Bars" color="#333" height="30" width="30" />
        <Loader type="Triangle" color="#333" height="30" width="30" />
      </div>
    );
  }
}
