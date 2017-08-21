import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

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

  it('\'s start button should call onStartPomodoro when clicked', function() {
    const onStartPomodoroSpy = spy();
    const wrapper = shallow(<PomodoroControls pomodoroStarted={false} onStartPomodoro={onStartPomodoroSpy}/>);
    wrapper.find('.pomodoro-start').simulate('click');
    expect(onStartPomodoroSpy.calledOnce).to.equal(true);
  });

  it('\'s stop button should call onStopPomodoro when clicked', function() {
    const onStopPomodoroSpy = spy();
    const wrapper = shallow(<PomodoroControls pomodoroStarted={true} onStopPomodoro={onStopPomodoroSpy}/>);
    wrapper.find('.pomodoro-stop').simulate('click');
    expect(onStopPomodoroSpy.calledOnce).to.equal(true);
  });

});
