import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import PomodoroReCreationSetter from '../src/components/pomodoro-re-creation-setter';

describe('<PomodoroReCreationSetter />', function () {

  describe('\'s child elements', function() {
    const wrapper = shallow(<PomodoroReCreationSetter />);
    it('should contain an input range element', () => {
      expect(wrapper.find('input[type="range"]')).to.have.length(1);
    });
  });

  describe('\'s input range element', function() {
    it('should have a min attribute set to 1', function() {
      const wrapper = shallow(<PomodoroReCreationSetter />);
      expect(wrapper.find('input[type="range"]').prop('min')).to.equal('1');
    });
    it('should have a step attribute set to 1', function() {
      const wrapper = shallow(<PomodoroReCreationSetter />);
      expect(wrapper.find('input[type="range"]').prop('step')).to.equal('1');
    });
    it('should have a max attribute set to the sum of durationCreation and durationRecreation in minutes, minus 1', function() {
      const wrapper = shallow(<PomodoroReCreationSetter durationCreation={1500} durationRecreation={300} />);
      expect(wrapper.find('input[type="range"]').prop('max')).to.equal(1800 / 60 - 1);
    });
    it('should have a value attribute set to durationCreation, in minutes', function() {
      const wrapper = shallow(<PomodoroReCreationSetter durationCreation={1500} durationRecreation={300} />);
      expect(wrapper.find('input[type="range"]').prop('value')).to.equal(1500 / 60);
    });
    it('\'s should call onChangeReCreation when changed', function() {
      const onChangeReCreationSpy = spy();
      const wrapper = shallow(<PomodoroReCreationSetter durationCreation={1500} durationRecreation={300} onChangeReCreation={() => onChangeReCreationSpy()} />);
      wrapper.find('input[type="range"]').simulate('change');
      expect(onChangeReCreationSpy.calledOnce).to.equal(true);
    });
  });

});
