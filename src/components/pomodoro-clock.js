import React, { Component } from 'react';

import PomodoroTimer from './pomodoro-timer';

class PomodoroClock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      durationCreation: 1500, // 1500 seconds equal 25 minutes
      durationElapsed: 0,
      durationRecreation: 300, // 300 seconds equal 5 minutes
      pomodoroMode: 'create', // create || recreate
      pomodoroStarted: false, // true || false      
    }
  }

  render() {
    const { durationCreation, durationElapsed, durationRecreation, pomodoroMode } = this.state;
    
    return (
      <div className="pomodoro-clock grid-container grid-container-padded">
        <div className="grid-x">
          <div className="cell">
            <h1 className="text-center">Pomodoro Clock</h1>
            <PomodoroTimer
              durationElapsed={durationElapsed}
              pomodoroMode={pomodoroMode}
              durationTotal={(pomodoroMode === 'create') ? durationCreation : durationRecreation}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default PomodoroClock;
