import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import PomodoroClock from '../src/components/pomodoro-clock';

describe('<Pomodoro Clock />', function () {
  it('should have headline tag', function () {
    const wrapper = shallow(<PomodoroClock />);
    expect(wrapper.find('h1')).to.have.length(1);
  });
});
