import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import PomodoroControls from '../src/components/pomodoro-controls';

describe('<PomodoroControls />', function () {

  it('should render a start and no stop button if pomodoroStarted === false', () => {
    const wrapper = shallow(<PomodoroControls pomodoroStarted={false} />);
    expect(wrapper.find('button.pomodoro-start')).to.have.length(1);
    expect(wrapper.find('button.pomodoro-stop')).to.have.length(0);    
  });

  it('should render a stop and no start button if pomodoroStarted === true', () => {
    const wrapper = shallow(<PomodoroControls pomodoroStarted={true} />);
    expect(wrapper.find('button.pomodoro-start')).to.have.length(0);
    expect(wrapper.find('button.pomodoro-stop')).to.have.length(1);    
  });

});
