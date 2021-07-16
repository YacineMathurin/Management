import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



export default class TinyBarCharts extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/9kd8rssL/';

  render() {
    return (
      <BarChart width={150} height={40} data={this.props.data}>
        <Bar dataKey="win"  fill="#3F51B5">
        {
            this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.win > 0 ? "#3F51B5":"#d62728"}/>
            ))
          }
        </Bar>
      </BarChart>
    );
  }
}
