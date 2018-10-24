import React from 'react';
import { shallow } from 'enzyme';

import Login from '../index';

describe('<Login />', () => {
  it('should render two buttons', () => {
    const renderedComponent = shallow(<Login />);

    expect(renderedComponent.find('button').length).toBe(2);
  });
});
