/**
 * https://github.com/ocleo1
 */

import React from 'react';
import ReactDOM from 'react-dom';

import PieChart from './PieChart';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {value: 10, color: '#ECD078'},
        {value: 30, color: '#D95B43'},
        {value: 20, color: '#C02942'},
        {value: 60, color: '#542437'},
        {value: 40, color: '#53777A'}
      ]
    };

    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    let data = [];
    switch(event.target.value) {
      case '1':
        data = [
          {value: 10, color: '#ECD078'},
          {value: 30, color: '#D95B43'},
          {value: 20, color: '#C02942'},
          {value: 60, color: '#542437'},
          {value: 40, color: '#53777A'}
        ];
        break;
      case '2':
        data = [
          {value: 40, color: '#53777A'},
          {value: 10, color: '#ECD078'},
          {value: 60, color: '#542437'},
          {value: 20, color: '#C02942'},
          {value: 30, color: '#D95B43'}
        ];
        break;
    }

    this.setState({ data: data });
  }

  render() {
    return (
      <div>
        <p>{"Added in HTML5, the HTML <canvas> element can be used to draw graphics via scripting in JavaScript. For example, it can be used to draw graphs, make photo compositions, create animations, or even do real-time video processing or rendering."}</p>
        <input type="radio" name="sample" value="1" onChange={this._onChange} />Sample Data 1
        <br />
        <input type="radio" name="sample" value="2" onChange={this._onChange} />Sample Data 2
        <div style={{display: 'flex', direction: 'row'}}>
          <div style={{flex: 2}}>
            <p>{"Mozilla applications gained support for <canvas> starting with Gecko 1.8 (i.e. Firefox 1.5). The element was originally introduced by Apple for the OS X Dashboard and Safari. Internet Explorer supports <canvas> from version 9 onwards; for earlier versions of IE, a page can effectively add support for <canvas> by including a script from Google's Explorer Canvas project. Google Chrome and Opera 9 also support <canvas>."}</p>
          </div>
          <div style={{flex: 1}}>
            <PieChart
              animation={true}
              radius={150}
              speed={0.02}
              data={this.state.data} />
          </div>
        </div>
        <p>{"The <canvas> element is also used by WebGL to draw hardware-accelerated 3D graphics on web pages."}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);

