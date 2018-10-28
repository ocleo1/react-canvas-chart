/**
 * https://github.com/ocleo1
 */

import React from 'react';
import ReactDOM from 'react-dom';

import BarChart from './BarChart';

ReactDOM.render(
  <BarChart barWidth={30} gapWidth={30} height={300}
    speed={2}
    data={[
      {value: 10, color: '#ECD078'},
      {value: 30, color: '#D95B43'},
      {value: 20, color: '#C02942'},
      {value: 60, color: '#542437'},
      {value: 40, color: '#53777A'}
    ]} />,
  document.getElementById('example')
);
