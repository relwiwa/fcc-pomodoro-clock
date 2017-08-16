import PropTypes from 'prop-types';
import React from 'react';

//import '../styles/pomodoro-timer.scss';

/** @function PomodoroTimer
 *  @description functional React component
 *  @param pomodoroMode is used to display current pomodoroMode
 *  @param durationTotal and @param durationElapsed
 *  - are used to calculate the remaining minutes and seconds to be
 *    displayed
 *  - are also used to position the pointer via the transform/rotate
 *    property */
const PomodoroTimer = (props) => {
  const { durationElapsed, durationTotal, pomodoroMode } = props;
  const remainingTime = durationTotal - durationElapsed;

  /** @function getRemainingMinutes
   *  @param totalSeconds
   *  @returns the minutes contained in the totalSeconds entered */
  const getRemainingMinutes = (totalSeconds) => {
    return (Math.floor(totalSeconds / 60));
  };

  /** @function getRemainingSeconds
   *  @param totalSeconds
   *  @returns seconds that are left after modulo'ing out the minutes
   *  - it adds a leading 0 if remainingSeconds is one digit only */
  const getRemainingSeconds = (totalSeconds) => {
    let remainingSeconds = totalSeconds % 60;
    if (remainingSeconds < 10) {
      remainingSeconds = '0' + remainingSeconds;
    }
    return remainingSeconds;
  };

  return (
    <div className="pomodoro-timer grid-x">
      <div className={'cell ' +  pomodoroMode}>
        <div className="outer-container">
          <p className="timer-label">{pomodoroMode}</p>
          <p className="remaining-time">
            <span className="remaining-minutes">{getRemainingMinutes(remainingTime)}</span>
            :
            <span className="remaining-seconds">{getRemainingSeconds(remainingTime)}</span>
          </p>            
          <div
            className="inner-container"
            style={{transform: 'rotate(' + ((durationElapsed * 360) / (durationTotal)) + 'deg)'}}
          >
            <div className="circle"></div>
            <div className="pointer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

PomodoroTimer.propTypes = {
  durationElapsed: PropTypes.number,
  durationTotal: PropTypes.number,
  pomodoroMode: PropTypes.string,
}

export default PomodoroTimer;
