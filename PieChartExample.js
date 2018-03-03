/**
 * https://github.com/ocleo1
 */

import React from 'react';
import ReactDOM from 'react-dom';

import PieChart from './PieChart';

class Example extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <PieChart
        radius={150}
        data={[
          {value: 10, color: '#ECD078'},
          {value: 30, color: '#D95B43'},
          {value: 20, color: '#C02942'},
          {value: 60, color: '#542437'},
          {value: 40, color: '#53777A'}
        ]} />
    );
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);

