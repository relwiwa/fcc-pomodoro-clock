import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import PomodoroClock from '../src/components/pomodoro-clock';
import PomodoroTimer from '../src/components/pomodoro-timer';

describe('<Pomodoro Clock />', function () {

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
    it ('should set durationCreation to initial value 25', function() {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.state('durationCreation')).to.equal(25);
    });
    it ('should set durationRecreation to initial value 5', function() {
      const wrapper = shallow(<PomodoroClock />);
      expect(wrapper.state('durationRecreation')).to.equal(5);
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
      expect(wrapper.state('pomodoroMode')).to.equal('creation');
    });
  });

});
