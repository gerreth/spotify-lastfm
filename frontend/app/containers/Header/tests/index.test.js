import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Header from '../index';

describe('<Header />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<Header />);

    expect(renderedComponent.find(Link).length).toBe(2);
  });
});
