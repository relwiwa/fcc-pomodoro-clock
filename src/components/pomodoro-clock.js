import React, { Component } from 'react';

class PomodoroClock extends Component {

  render() {
    
    return (
      <div className="pomodoro-clock grid-container grid-container-padded">
        <div className="grid-x">
          <div className="cell">
            <h1 className="text-center">Pomodoro Clock</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default PomodoroClock;
