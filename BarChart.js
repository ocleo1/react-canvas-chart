/**
 * https://github.com/ocleo1
 * 
 * @providesModule BarChart
 * 
 * ^                          ---
 * |                           |
 * |         ___               |
 * |        |   |              |
 * |        |   |  ___         |
 * |        |   | |   |        | height
 * |        |   | |   |        |
 * |   ___  |   | |   |        |
 * |  |   | |   | |   |        |
 * |  |   | |   | |   |        |
 *  ------------------------> ---
 * |-------- width ---------|
 */

import React from 'react';
import ReactDOM from 'react-dom';

const CANVAS_PADDING_LEFT = 10;
const CANVAS_PADDING_BOTTOM = 10;
const CANVAS_PADDING_TOP = 50;

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);

    const { barWidth, gapWidth, height, data } = this.props;
    const width = CANVAS_PADDING_LEFT + (barWidth + gapWidth) * data.length + gapWidth;
    const maskWidth = width - CANVAS_PADDING_LEFT * 2;
    const maskHeight = height - CANVAS_PADDING_BOTTOM - CANVAS_PADDING_TOP;
    this.state = {
      width: width,
      height: height,
      maskWidth: maskWidth,
      maskHeight: maskHeight,
      data: data
    };

    this.renderMask = this.renderMask.bind(this);
  }
  
  componentDidMount() {
    this.renderBarChart();
    if (this.props.animation) {
      this._AnimationId = window.requestAnimationFrame(this.renderMask);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps, () => {
      this.renderBarChart();
      if (this.props.animation) {
        this._AnimationId = window.requestAnimationFrame(this.renderMask);
      }
    });
  }

  renderBarChart() {
    const { barWidth, gapWidth } = this.props;
    const { width, height } = this.state;

    var barChartCtx = ReactDOM.findDOMNode(this.refs.barChart).getContext('2d');
    barChartCtx.clearRect(0, 0, width, height);

    this.renderBar(barChartCtx, barWidth, gapWidth, height);
    this.renderAxis(barChartCtx, width, height);
  }
  renderBar(barChartCtx, barWidth, gapWidth, height) {
    const barValues = this.state.data.map((bar) => bar.value);
    const maxValue = Math.max.apply(null, barValues);
    const maxHeight = height - CANVAS_PADDING_TOP - CANVAS_PADDING_BOTTOM;
    
    for (let i = 0; i < this.state.data.length; i++) {
      let barHeight = maxHeight * this.state.data[i].value / maxValue;
      let x = CANVAS_PADDING_LEFT + gapWidth * (i + 1) + barWidth * i;
      let y = height - barHeight - CANVAS_PADDING_BOTTOM;
      barChartCtx.fillStyle = this.state.data[i].color;
      barChartCtx.fillRect(x, y, barWidth, barHeight);
    }
  }
  renderAxis(barChartCtx, width, height) {
    barChartCtx.beginPath();
    // Y-axis arrow
    barChartCtx.moveTo(CANVAS_PADDING_LEFT, 0);
    barChartCtx.lineTo(CANVAS_PADDING_LEFT - 5, 10);
    barChartCtx.moveTo(CANVAS_PADDING_LEFT, 0);
    barChartCtx.lineTo(CANVAS_PADDING_LEFT + 5, 10);
    // X-axis & Y-axis
    barChartCtx.moveTo(CANVAS_PADDING_LEFT, 0);
    barChartCtx.lineTo(CANVAS_PADDING_LEFT, height - CANVAS_PADDING_BOTTOM);
    barChartCtx.lineTo(width, height - CANVAS_PADDING_BOTTOM);
    // Y-axis arrow
    barChartCtx.moveTo(width, height - CANVAS_PADDING_BOTTOM);
    barChartCtx.lineTo(width - 10, height - CANVAS_PADDING_BOTTOM - 5);
    barChartCtx.moveTo(width, height - CANVAS_PADDING_BOTTOM);
    barChartCtx.lineTo(width - 10, height - CANVAS_PADDING_BOTTOM + 5);
    // stroke
    barChartCtx.stroke();
  }
  renderMask() {
    var maskCtx = ReactDOM.findDOMNode(this.refs.mask).getContext('2d');

    this.state.maskHeight -= this.props.speed;
    if (this.state.maskHeight > 0) {
      maskCtx.clearRect(0, 0, this.state.width, this.state.height);
      maskCtx.fillStyle = '#FFF';
      maskCtx.fillRect(CANVAS_PADDING_LEFT + 1, CANVAS_PADDING_TOP, this.state.maskWidth, this.state.maskHeight);
      
      this._AnimationId = window.requestAnimationFrame(this.renderMask);
    } else {
      maskCtx.clearRect(0, 0, this.state.width, this.state.height);
      window.cancelAnimationFrame(this._AnimationId);
    }
  }
  
  render() {
    const { width, height } = this.state;

    return (
      <div style={{width: width, height: height}}>
        <canvas ref="barChart" width={width} height={height} style={{position: 'absolute'}}>
          This text is displayed if your browser does not support HTML5 Canvas.
        </canvas>
        <canvas ref="mask" width={width} height={height} style={{position: 'absolute'}}>
          This text is displayed if your browser does not support HTML5 Canvas.
        </canvas>
      </div>
    );
  }
}

BarChart.defaultProps = {
  animation: true,
  barWidth: 50,
  gapWidth: 50,
  height: 500,
  speed: 10
};
BarChart.propTypes = {
  animation: React.PropTypes.bool,
  barWidth: React.PropTypes.number,
  gapWidth: React.PropTypes.number,
  height: React.PropTypes.number,
  speed: React.PropTypes.number,
  data: React.PropTypes.array.isRequired
};
