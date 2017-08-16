import PropTypes from 'prop-types';
import React from 'react';

//import '../styles/pomodoro-controls.scss';


/** @function PomodoroControls
 *  @description React functional component
 *  - displays one of two buttons, depending on @param pomodoroStarted
 *  - callbacks get passed to parent component
 *  @callback onStartPomodoro when user clicks start button
 *  @callback onStopPomodoro when user clicks stop button */
const PomodoroControls = (props) => {
  const { onStartPomodoro, onStopPomodoro, pomodoroStarted } = props;
  
  return (
    <div className="pomodoro-controls text-center">
      {pomodoroStarted === false && <button
        className="pomodoro-start pomodoro-button"
        onClick={onStartPomodoro}
      >
        <i className="fa fa-play"></i>
      </button>}
      {pomodoroStarted === true && <button
        className="pomodoro-stop pomodoro-button"
        onClick={onStopPomodoro}
      >
        <i className="fa fa-stop"></i>
      </button>}
    </div>
  );
}

PomodoroControls.propTypes = {
  onStopPomodoro: PropTypes.func.isRequired,
  onStartPomodoro: PropTypes.func.isRequired,
  pomodoroStarted: PropTypes.bool.isRequired,
};

export default PomodoroControls;
