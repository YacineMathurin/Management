import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

const COLORS = ['#3F51B5', '#BDBDBD'];

export default class TinyPieCharts extends PureComponent {
  constructor(props) {
    super(props)
    const pctReussite = this.props.data
    this.state = {
      data: [{ value: pctReussite }, { value: 100 - pctReussite }]
    }
  }

  render() {
    return (
      <PieChart width={80} height={40}>
        <Pie dataKey="value" startAngle={180} cx='50%' cy='100%' endAngle={0} paddingAngle={2} data={this.state.data} outerRadius={35} fill="#8884d8">
        {
          	this.state.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
         </Pie> 
      </PieChart>
    );
  }
}