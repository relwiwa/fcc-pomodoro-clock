import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import PomodoroClock from '../src/components/pomodoro-clock';
import PomodoroTimer from '../src/components/pomodoro-timer';

describe('<PomodoroClock />', function () {

  describe('\'s child elements', function() {

    it('should contain one <h1>', function () {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.find('h1')).to.have.length(1);
    });
    it('should contain one <PomodoroDurationSetter>', function () {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.containsMatchingElement(<PomodoroDurationSetter />)).to.equal(true);
    });
    it('should contain one <PomodoroTimer>', function () {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.containsMatchingElement(<PomodoroTimer />)).to.equal(true);
    });
    it('should contain one <PomodoroControls> component', function () {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.containsMatchingElement(<PomodoroControls />)).to.equal(true);
    });
  });

  describe('\'s state object', function() {
    it ('should set durationCreation to initial value 1500 seconds', function() {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.state('durationCreation')).to.equal(1500);
    });
    it ('should set durationRecreation to initial value 300 seconds', function() {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.state('durationRecreation')).to.equal(300);
    });
    it ('should set durationElapsed to initial value 0', function() {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.state('durationElapsed')).to.equal(0);
    });
    it ('should set pomodoroStarted to initial value false', function() {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.state('pomodoroStarted')).to.equal(false);
    });
    it ('should set pomodoroMode to initial value creation', function() {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.state('pomodoroMode')).to.equal('create');
    });
  });

  describe('props passed to <PomodoroTimer>', function() {

    it('should pass a pomodoroMode prop', function() {
      const wrapper = shallow(<PomodoroClock />);
      const pomodoroTimer = wrapper.find(PomodoroTimer);
      const pomodoroMode = wrapper.state('pomodoroMode');
      expect(pomodoroTimer.prop('pomodoroMode')).to.equal(wrapper.state('pomodoroMode'));
    });
    it('should pass a durationElapsed prop', function() {
      const wrapper = shallow(<PomodoroClock />);
      let pomodoroTimer = wrapper.find(PomodoroTimer);
      const durationElapsed = wrapper.state('durationElapsed');
      expect(pomodoroTimer.prop('durationElapsed')).to.equal(wrapper.state('durationElapsed'));
    });
    it('should pass a durationTotal prop according to pomodoroMode', function() {
      const wrapper = shallow(<PomodoroClock />);
      let pomodoroTimer = wrapper.find(PomodoroTimer);
      wrapper.setState({'pomodoroMode': 'create'});
      expect(pomodoroTimer.prop('durationTotal')).to.equal(wrapper.state('durationCreation'));
      wrapper.setState({'pomodoroMode': 'recreate'});
      pomodoroTimer = wrapper.find(PomodoroTimer);
      expect(pomodoroTimer.prop('durationTotal')).to.equal(wrapper.state('durationRecreation'));
    });

  });

});
