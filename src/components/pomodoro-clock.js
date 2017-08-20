import React, { Component } from 'react';

import PomodoroControls from './pomodoro-controls';
import PomodoroTimer from './pomodoro-timer';

class PomodoroClock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      durationCreation: 30, // 1500 seconds equal 25 minutes
      durationElapsed: 0,
      durationRecreation: 30, // 300 seconds equal 5 minutes
      pomodoroMode: 'create', // create || recreate
      pomodoroStarted: false, // true || false      
    }

    this.handlePomodoroInterval = this.handlePomodoroInterval.bind(this);
    this.handleStartPomodoro = this.handleStartPomodoro.bind(this);
    this.handleStopPomodoro = this.handleStopPomodoro.bind(this);
  }

  handlePomodoroInterval() {
    const { durationCreation, durationRecreation, durationElapsed, pomodoroMode } = this.state;
    const currentDuration = (pomodoroMode === 'create' ? durationCreation : durationRecreation);

    if (durationElapsed < currentDuration - 1) {
      this.setState({
        durationElapsed: durationElapsed + 1,
      });
    }
    else {
    const nextPomodoroMode = (pomodoroMode === 'create' ? 'recreate' : 'create');
      this.setState({
        durationElapsed: 0,
        pomodoroMode: nextPomodoroMode,
      });
    }
  }

  /** @function handleStartPomodro
   *  @description
   *  - starts pomodoroInterval and saves a reference for it to be stopped
   *  - sets pomodoroStarted in state to true */
  handleStartPomodoro() {
    this.pomodoroInterval = setInterval(this.handlePomodoroInterval, 1000);
    this.setState({ pomodoroStarted: true });
  }

  /** @function handleStopPomodoro
   *  @description
   *  - stops pomodoroInterval
   *  - resets durationElapsed and pomodoroMode in state to initial values
   *  - sets pomdoroStarted in state to false */
  handleStopPomodoro() {
    clearInterval(this.pomodoroInterval);
    this.setState({
      durationElapsed: 0,
      pomodoroMode: 'create',
      pomodoroStarted: false,
    });
  }

  render() {
    const { durationCreation, durationElapsed, durationRecreation, pomodoroMode, pomodoroStarted } = this.state;
    
    return (
      <div className={'pomodoro-clock grid-container grid-container-padded ' + pomodoroMode}>
        <div className="grid-x">
          <div className="cell">
            <h1 className="text-center">Pomodoro Clock</h1>
            <PomodoroTimer
              durationElapsed={durationElapsed}
              pomodoroMode={pomodoroMode}
              durationTotal={(pomodoroMode === 'create') ? durationCreation : durationRecreation}
            />
            <PomodoroControls
              onStartPomodoro={this.handleStartPomodoro}
              onStopPomodoro={this.handleStopPomodoro}
              pomodoroStarted={pomodoroStarted}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default PomodoroClock;
