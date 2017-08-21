import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import PomodoroClock from '../src/components/pomodoro-clock';
import PomodoroControls from '../src/components/pomodoro-controls';
import PomodoroTimer from '../src/components/pomodoro-timer';

/*  jsdom does not yet handle audio-elements well, so playing the audio
    needs to be disabled for testing purposes;
    alternative would be to use sinon and pass the playGong function
    in as an argument to the functions that play the gong */

describe('<PomodoroClock />', function () {

  let wrapper;
  beforeEach(function() {
    wrapper = shallow(<PomodoroClock />);
  });

  it('should add a wrapping class according to pomodoroMode', function() {
    expect(wrapper.find('.pomodoro-clock.create')).to.have.length(1);
    wrapper.setState({pomodoroMode: 'recreate'});
    expect(wrapper.find('.pomodoro-clock.recreate')).to.have.length(1);
  });


  describe('\'s child elements', function() {
    it('should contain one <h1>', function () {
      expect(wrapper.find('h1')).to.have.length(1);
    });
    it('should contain one <PomodoroDurationSetter>', function () {
      expect(wrapper.containsMatchingElement(<PomodoroDurationSetter />)).to.equal(true);
    });
    it('should contain one <PomodoroTimer>', function () {
      expect(wrapper.containsMatchingElement(<PomodoroTimer />)).to.equal(true);
    });
    it('should contain one <PomodoroControls> component', function () {
      expect(wrapper.containsMatchingElement(<PomodoroControls />)).to.equal(true);
    });
    it('should contain one <audio>', function() {
      expect(wrapper.find('audio')).to.have.length(1);      
    });
  });

  describe('\'s state object', function() {
    it ('should set durationCreation to initial value 1500 seconds', function() {
      expect(wrapper.state('durationCreation')).to.equal(1500);
    });
    it ('should set durationRecreation to initial value 300 seconds', function() {
      expect(wrapper.state('durationRecreation')).to.equal(300);
    });
    it ('should set durationElapsed to initial value 0', function() {
      expect(wrapper.state('durationElapsed')).to.equal(0);
    });
    it ('should set pomodoroStarted to initial value false', function() {
      expect(wrapper.state('pomodoroStarted')).to.equal(false);
    });
    it ('should set pomodoroMode to initial value creation', function() {
      expect(wrapper.state('pomodoroMode')).to.equal('create');
    });
  });

  describe('props passed to <PomodoroTimer>', function() {
    it('should pass a pomodoroMode prop', function() {
      const pomodoroTimer = wrapper.find(PomodoroTimer);
      const pomodoroMode = wrapper.state('pomodoroMode');
      expect(pomodoroTimer.prop('pomodoroMode')).to.equal(wrapper.state('pomodoroMode'));
    });
    it('should pass a durationElapsed prop', function() {
      let pomodoroTimer = wrapper.find(PomodoroTimer);
      const durationElapsed = wrapper.state('durationElapsed');
      expect(pomodoroTimer.prop('durationElapsed')).to.equal(wrapper.state('durationElapsed'));
    });
    it('should pass a durationTotal prop according to pomodoroMode', function() {
      let pomodoroTimer = wrapper.find(PomodoroTimer);
      wrapper.setState({'pomodoroMode': 'create'});
      expect(pomodoroTimer.prop('durationTotal')).to.equal(wrapper.state('durationCreation'));
      wrapper.setState({'pomodoroMode': 'recreate'});
      pomodoroTimer = wrapper.find(PomodoroTimer);
      expect(pomodoroTimer.prop('durationTotal')).to.equal(wrapper.state('durationRecreation'));
    });
  });

  describe('props passed to <PomodoroControls>', function() {
    it('should pass a pomodoroStarted prop', function() {
      const pomodoroControls = wrapper.find(PomodoroControls);
      const pomodoroStarted = wrapper.state('pomodoroStarted');
      expect(pomodoroControls.prop('pomodoroStarted')).to.equal(wrapper.state('pomodoroStarted'));
    });
    it('should pass an onStartPomodoro callback prop', function() {
      const pomodoroControls = wrapper.find(PomodoroControls);
      const handleStartPomodoro = wrapper.instance().handleStartPomodoro;
      expect(pomodoroControls.prop('onStartPomodoro')).to.exist;
      expect(pomodoroControls.prop('onStartPomodoro')).to.eql(handleStartPomodoro);
    });
    it('should pass an onStopPomodoro callback prop', function() {
      const pomodoroControls = wrapper.find(PomodoroControls);
      const handleStopPomodoro = wrapper.instance().handleStopPomodoro;
      expect(pomodoroControls.prop('onStopPomodoro')).to.exist;
      expect(pomodoroControls.prop('onStopPomodoro')).to.eql(handleStopPomodoro);
    });
  });

  describe('\'s handleStartPomodoro function', function() {
    beforeEach(function() {
      wrapper = mount(<PomodoroClock />);
    });

    it('should set state["pomodoroStarted"] to true', function() {
      wrapper.instance().handleStartPomodoro();
      expect(wrapper.state('pomodoroStarted')).to.equal(true);      
    });
    it('should make sure that pomodoroInterval gets started', function() {
      wrapper.instance().handleStartPomodoro();
      expect(wrapper.instance().pomodoroInterval).to.exist;
      expect(wrapper.instance().pomodoroInterval._repeat).to.exist;
    });
  });

  describe('\'s handleStopPomodoro function', function() {
    beforeEach(function() {
      wrapper = mount(<PomodoroClock />);
    });
    it('should set state["pomodoroStarted"] to false', function() {
      wrapper.instance().handleStopPomodoro();
      expect(wrapper.state('pomodoroStarted')).to.equal(false);      
    });
    it('should set state["pomodoroStarted"] to false after pomodoroClock has been started', function() {
      wrapper.instance().handleStartPomodoro();
      wrapper.instance().handleStopPomodoro();
      expect(wrapper.state('pomodoroStarted')).to.equal(false);      
    });
    it('should reset durationElapsed to zero', function() {
      wrapper.instance().handleStartPomodoro();
      wrapper.setState({durationElapsed: 12});
      wrapper.instance().handleStopPomodoro();
      expect(wrapper.state('durationElapsed')).to.equal(0);      
    });
    it('should reset pomodoroMode to create', function() {
      wrapper.instance().handleStartPomodoro();
      wrapper.setState({pomodoroMode: 'recreate'});
      wrapper.instance().handleStopPomodoro();
      expect(wrapper.state('pomodoroMode')).to.equal('create');      
    });
    it('should make sure that pomodoroInterval gets stopped', function() {
      wrapper.instance().handleStartPomodoro();
      wrapper.instance().handleStopPomodoro();
      expect(wrapper.instance().pomodoroInterval._repeat).to.not.exist;
    });
  });

  describe('\'s handlePomodoroInterval function', function() {
    beforeEach(function() {
      wrapper = mount(<PomodoroClock />);
    });
    it('should increase durationElapsed by 1 when it is < durationCreation', function() {
      wrapper.instance().handleStartPomodoro();
      wrapper.setState({ durationElapsed: 5 });
      wrapper.instance().handlePomodoroInterval();
      expect(wrapper.state('durationElapsed')).to.equal(6);      
    });
    it('should set durationElapsed to 0 when it === durationCreation - 1', function() {
      wrapper.instance().handleStartPomodoro();
      wrapper.setState({ durationElapsed: 1499 });
      wrapper.instance().handlePomodoroInterval();
      expect(wrapper.state('durationElapsed')).to.equal(0);
    });
    it('should toggle pomodoroMode when it === durationCreation - 1', function() {
      wrapper.setState({ durationElapsed: 1499 });
      wrapper.instance().handlePomodoroInterval();
      expect(wrapper.state('pomodoroMode')).to.equal('recreate');
      wrapper.setState({ durationElapsed: 1499 });
      wrapper.instance().handlePomodoroInterval();
      expect(wrapper.state('pomodoroMode')).to.equal('create');
    });
  });
});
