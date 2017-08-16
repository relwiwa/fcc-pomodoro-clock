import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import PomodoroTimer from '../src/components/pomodoro-timer';

describe('<PomodoroTimer />', function () {

  describe('\'s child elements', function() {

    it('should contain one .timer-label p', function () {
      const wrapper = shallow(<PomodoroTimer />);
      expect(wrapper.find('p.timer-label')).to.have.length(1);
    });

    it('should contain one .remaining-time p', function () {
      const wrapper = shallow(<PomodoroTimer />);
      expect(wrapper.find('p.remaining-time')).to.have.length(1);
    });

    it('should contain one .circle div', function () {
      const wrapper = shallow(<PomodoroTimer />);
      expect(wrapper.find('div.circle')).to.have.length(1);
    });

    it('should contain one .pointer div', function () {
      const wrapper = shallow(<PomodoroTimer />);
      expect(wrapper.find('div.pointer')).to.have.length(1);
    });

    it('should contain a timer-label element with text according to pomodoroMode', function() {
      let wrapper = shallow(<PomodoroTimer pomodoroMode="create" />);
      expect(wrapper.containsMatchingElement(<p>create</p>)).to.equal(true);
      wrapper = shallow(<PomodoroTimer pomodoroMode="recreate" />);
      expect(wrapper.containsMatchingElement(<p>recreate</p>)).to.equal(true);
    });
  });

  describe('\'s remainingTime element', function() {

    it('should display 0 minutes for remainingTime < 60 seconds', function() {
      let wrapper = shallow(<PomodoroTimer durationElapsed={60} durationTotal={60} />);
      expect(wrapper.find('.remaining-minutes').text()).to.equal('0');
      wrapper = shallow(<PomodoroTimer durationElapsed={1} durationTotal={60} />);
      expect(wrapper.find('.remaining-minutes').text()).to.equal('0');
    });
    it('should display 1 minute for remainingTime >= 60 && < 119', function() {
      let wrapper = shallow(<PomodoroTimer durationElapsed={60} durationTotal={120} />);
      expect(wrapper.find('.remaining-minutes').text()).to.equal('1');
      wrapper = shallow(<PomodoroTimer durationElapsed={59} durationTotal={120} />);
      expect(wrapper.find('.remaining-minutes').text()).to.equal('1');
      wrapper = shallow(<PomodoroTimer durationElapsed={30} durationTotal={120} />);
      expect(wrapper.find('.remaining-minutes').text()).to.equal('1');
    });
    it('should display 25 minutes for remainingTime === 1500', function() {
      let wrapper = shallow(<PomodoroTimer durationElapsed={0} durationTotal={1500} />);
      expect(wrapper.find('.remaining-minutes').text()).to.equal('25');
    });

    it('should display 00 seconds for remainingTime === 0', function() {
      let wrapper = shallow(<PomodoroTimer durationElapsed={60} durationTotal={60} />);
      expect(wrapper.find('.remaining-seconds').text()).to.equal('00');
    });
    it('should display 01 seconds for remainingTime === 1', function() {
      let wrapper = shallow(<PomodoroTimer durationElapsed={59} durationTotal={60} />);
      expect(wrapper.find('.remaining-seconds').text()).to.equal('01');
    });
    it('should display 10 seconds for remainingTime === 10', function() {
      let wrapper = shallow(<PomodoroTimer durationElapsed={50} durationTotal={60} />);
      expect(wrapper.find('.remaining-seconds').text()).to.equal('10');
    });
    it('should display 59 seconds for remainingTime === 59', function() {
      let wrapper = shallow(<PomodoroTimer durationElapsed={1} durationTotal={60} />);
      expect(wrapper.find('.remaining-seconds').text()).to.equal('59');
    });
    it('should display 00 seconds for remainingTime === 60', function() {
      let wrapper = shallow(<PomodoroTimer durationElapsed={0} durationTotal={60} />);
      expect(wrapper.find('.remaining-seconds').text()).to.equal('00');
    });
  });

});
