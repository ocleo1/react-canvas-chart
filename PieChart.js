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

    this.state = {
      data: this.props.data
    };
  }

  componentDidMount() {
    this.renderPieChart();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data }, () => {
      this.renderPieChart();
    });
  }

  renderPieChart() {
    const { radius } = this.props;

    var angle = (ratio) => Math.PI * 2 * ratio;
    var startAngle = angle(0);

    var total = 0;
    for (let item of this.state.data) {
      total += item.value;
    }

    var pieChartCtx = ReactDOM.findDOMNode(this.refs.pieChart).getContext('2d');
    pieChartCtx.clearRect(0, 0, radius * 2, radius * 2);

    for (let item of this.state.data) {
      pieChartCtx.fillStyle = item.color;
      pieChartCtx.beginPath();
      pieChartCtx.moveTo(radius, radius);
      pieChartCtx.arc(radius, radius, radius, startAngle, startAngle + angle(item.value / total), false);
      pieChartCtx.lineTo(radius, radius);
      pieChartCtx.fill();
      startAngle += angle(item.value / total);
    }
  }

  render() {
    const width = this.props.radius * 2;
    const height = this.props.radius * 2;

    return (
      <canvas ref="pieChart" width={width} height={height}>
        This text is displayed if your browser does not support HTML5 Canvas.
      </canvas>
    );
  }
}

PieChart.defaultProps = {
  radius: 100
};
PieChart.propTypes = {
  radius: React.PropTypes.number,
  data: React.PropTypes.array.isRequired
};

