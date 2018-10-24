import React from 'react';
import { mount } from 'enzyme';

import LastfmCallback from '../LastfmCallback';

describe('<LastfmCallback />', () => {
  it('should show loading', () => {
    const renderedComponent = mount(<LastfmCallback />);
    expect(renderedComponent.find('p.loading').length).toBe(1);
  });
});
