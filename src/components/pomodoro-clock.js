import React, { Component } from 'react';

import specs from '../data/pomodoro-clock.specs';

import PomodoroTimer from './pomodoro-timer';


class PomodoroClock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      durationCreation: 25,
      durationElapsed: 0,
      durationRecreation: 5,
      pomodoroMode: 'creation', // creation || recreation
      pomodoroStarted: false, // true || false      
    }
  }

  render() {
    
    return (
      <div className="pomodoro-clock grid-container grid-container-padded">
        <div className="grid-x">
          <div className="cell">
            <h1 className="text-center">Pomodoro Clock</h1>
            <PomodoroTimer />
          </div>
        </div>
      </div>
    );
  }
};

export default PomodoroClock;
