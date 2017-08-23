import PropTypes from 'prop-types';
import React from 'react';

import '../styles/pomodoro-re-creation-setter.scss';

/** @function PomodoroReCreationSetter
 *  @description React functional, controlled component
 *  - Let's user change @param durationCreation, and @param durationRecreation
 *    respectively
 *  - @callback onChangeReCreation gets passed to parent component
 *    upon change of input range */
const PomodoroReCreationSetter = (props) => {
  const { durationCreation, durationRecreation, onChangeReCreation } = props;

  const renderButton = (lightOrDark, faIcon) => {
    return (
      <span className={'pomodoro-button ' + (lightOrDark === 'light' ? 'light' : 'dark')}>
        <span className={'fa ' + faIcon}></span>
      </span>
    );
  }

  return (
    <div className="pomodoro-re-creation-setter">
      <div className="grid-x grid-padding-x align-middle align-center">
        <div className="cell small-2 medium-1 text-center">
          {renderButton('light', 'fa-desktop')}
        </div>
        <div className="cell small-6 medium-4 text-center">
          <input
            max={(durationCreation + durationRecreation) / 60 - 1}
            min="1"
            onChange={onChangeReCreation}
            step="1"
            type="range"
            value={durationCreation / 60}
          />
        </div>
        <div className="cell small-2 medium-1 text-center">
          {renderButton('dark', 'fa-coffee')}
        </div>
      </div>
    </div>
  );
}

PomodoroReCreationSetter.propTypes = {
  durationCreation: PropTypes.number.isRequired,
  durationRecreation: PropTypes.number.isRequired,
  onChangeReCreation: PropTypes.func,
};

export default PomodoroReCreationSetter;
