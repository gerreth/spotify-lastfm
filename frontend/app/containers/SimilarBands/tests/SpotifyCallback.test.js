import React from 'react';
import { shallow } from 'enzyme';

import SpotifyCallback from '../SpotifyCallback';

describe('<SpotifyCallback />', () => {
  it('should show loading', () => {
    const renderedComponent = shallow(<SpotifyCallback />);
    expect(renderedComponent.find('p.loading').length).toBe(1);
  });
});
