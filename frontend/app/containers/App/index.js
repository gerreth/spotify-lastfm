/**
 *
 * App.js
 *
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Bands from 'containers/Bands/Loadable';
import Header from 'containers/Header/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import LastfmCallback from 'containers/LastfmCallback';
import Login from 'containers/Login/Loadable';
import Logout from 'containers/Logout/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SpotifyCallback from 'containers/SpotifyCallback';

import { ContentWrapper } from './styled';

export default function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <ContentWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/bands" component={Bands} />

          <Route exact path="/lastfm/callback" component={LastfmCallback} />
          <Route exact path="/spotify/callback" component={SpotifyCallback} />

          <Route component={NotFoundPage} />
        </Switch>
      </ContentWrapper>
    </div>
  );
}
