import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Tooltip, Legend, Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
// vert = #03fc62
// rouge = #fc0317
const COLORS2 = ['#03fc62', '#fc0317','#03fc62', '#fc0317','#03fc62', '#fc0317','#03fc62', '#fc0317','#03fc62', '#fc0317','#03fc62', '#fc0317','#03fc62', '#fc0317','#03fc62', '#fc0317','#03fc30', '#fc0317']

export default class StatsPieChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie data={this.props.data1} dataKey="freq" isAnimationActive={false} cx={200} cy={200} outerRadius={60} fill="#8884d8">
        {
          	this.props.data1.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
        }
        </Pie>
        <Pie data={this.props.data2} dataKey="value" isAnimationActive={false} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label>
        {
          	this.props.data2.map((entry, index) => <Cell fill={COLORS2[index % COLORS.length]}/>)
        }
        </Pie>
        <Tooltip
            formatter={function(value, name) {
              return `${value}%`;
            }}
            labelFormatter={function(value) {
              return `label: ${value}%`;
            }}
          />
  
        <Legend
        payload={
          this.props.data1.map((item, index) => ({
          id: item.name,
          type: "square",
          value: `${item.name} ${item.nbcourse} courses, (${item.freq}%)`,
          color: COLORS[index % COLORS.length]
        })
        )
        }
        //layout="vertical" verticalAlign="right" align="center"
        wrapperStyle={{ top: 0, left: 400 }}
      />
      </PieChart>
    );
  }
}
