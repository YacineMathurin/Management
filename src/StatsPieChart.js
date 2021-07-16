import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Tooltip, Legend, Cell,
} from 'recharts';

const COLORS = ['#800080','#FF00FF','#000080','#0000FF','#008080','#00FFFF','#008000','#00FF00','#808000','#FFFF00','#800000','#FF0000']

export default class StatsPieChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie data={this.props.data} dataKey='frequence' isAnimationActive={false} cx={200} cy={200} outerRadius={120} fill='#8884d8' label>
        {
          	this.props.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
        }
        </Pie>
        <Tooltip
            formatter={function(value, name, payload) {
              return `${payload.payload.valeur} ${value}%`;
            }}
          />
      </PieChart>
    );
  }
}
