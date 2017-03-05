import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';

import { LoadingIndicator } from '../../src/loadingindicator/components';


describe('<LoadingIndicator/>', () => {

  it('should create an inactive loading indicator', () => {

    const wrapper = shallow(<LoadingIndicator active={false} />);

    expect(wrapper.contains(<div/>)).toBe(false);

  });

  it('should create an active loading indicator', () => {

    const wrapper = shallow(<LoadingIndicator active={true} />);

    expect(wrapper.contains(<div/>)).toBe(true);

  });

});
