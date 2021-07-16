import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

const COLORS = ['#f2f2f2', '#3F51B5'];

export default class TinyPieCharts extends PureComponent {
  constructor(props) {
    super(props)
    const pctReussite = this.props.data
    this.state = {
      data: [{ value: 100 - pctReussite }, { value: pctReussite }]
    }
  }

  render() {
    return (
      <PieChart  width={100} height={80}>
        {/* on desactive l'animation, c'est sympa une fois, mais ca fait mal au yeux*/}
        <Pie isAnimationActive={false} dataKey="value" startAngle={-270}  endAngle={360} paddingAngle={0} data={this.state.data} innerRadius={20} outerRadius={40} fill="#8884d8">
        {
          	this.state.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
         </Pie> 
      </PieChart>
    );
  }
}