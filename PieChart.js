/**
 * https://github.com/ocleo1
 * 
 * @providesModule PieChart
 */

import React from 'react';
import ReactDOM from 'react-dom';

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.animation) {
      this._end = 2;
    }

    this.renderMask = this.renderMask.bind(this);
  }

  componentDidMount() {
    this.renderPieChart();
    if (this.props.animation) {
      this._AnimationId = window.requestAnimationFrame(this.renderMask);
    }
  }
  componentDidUpdate() {
    this.renderPieChart();
    if (this.props.animation) {
      this._end = 2;
      this._AnimationId = window.requestAnimationFrame(this.renderMask);
    }
  }

  renderPieChart() {
    const { data, radius } = this.props;

    var angle = (ratio) => Math.PI * 2 * ratio;
    var startAngle = angle(0);

    var total = 0;
    for (let item of data) {
      total += item.value;
    }

    var pieChartCtx = ReactDOM.findDOMNode(this.refs.pieChart).getContext('2d');
    pieChartCtx.clearRect(0, 0, radius * 2, radius * 2);

    for (let item of data) {
      pieChartCtx.fillStyle = item.color;
      pieChartCtx.beginPath();
      pieChartCtx.moveTo(radius, radius);
      pieChartCtx.arc(radius, radius, radius, startAngle, startAngle + angle(item.value / total), false);
      pieChartCtx.lineTo(radius, radius);
      pieChartCtx.fill();
      startAngle += angle(item.value / total);
    }
  }
  renderMask() {
    const { speed, radius } = this.props;

    var maskCtx = ReactDOM.findDOMNode(this.refs.mask).getContext('2d');

    this._end -= speed;
    if (this._end > 0) {
      maskCtx.clearRect(0, 0, radius * 2, radius * 2);
      maskCtx.fillStyle = '#FFF';
      maskCtx.beginPath();
      maskCtx.moveTo(radius, radius);
      maskCtx.arc(radius, radius, radius + 1, Math.PI * 0, Math.PI * this._end, false);
      maskCtx.lineTo(radius, radius);
      maskCtx.fill();

      this._AnimationId = window.requestAnimationFrame(this.renderMask);
    } else {
      maskCtx.clearRect(0, 0, radius * 2, radius * 2);
      window.cancelAnimationFrame(this._AnimationId);
    }
  }

  render() {
    const width = this.props.radius * 2;
    const height = this.props.radius * 2;

    return (
      <div style={{width: width, height: height, position: 'relative'}}>
        <canvas ref="pieChart" width={width} height={height} style={{position: 'absolute'}}>
          This text is displayed if your browser does not support HTML5 Canvas.
        </canvas>
        {
          this.props.animation ?
            <canvas ref="mask" width={width} height={height} style={{position: 'absolute'}}>
              This text is displayed if your browser does not support HTML5 Canvas.
            </canvas> :
            null
        }
      </div>
    );
  }
}

PieChart.defaultProps = {
  animation: true,
  radius: 200,
  speed: 0.02
};
PieChart.propTypes = {
  animation: React.PropTypes.bool,
  radius: React.PropTypes.number,
  speed: React.PropTypes.number,
  data: React.PropTypes.array.isRequired
};
