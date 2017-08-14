import React from 'react';
import { render } from 'react-dom';

import './global-styles.scss';
import PomodoroClock from './components/pomodoro-clock';

render(
  <PomodoroClock />,
  document.getElementById('root')
);
