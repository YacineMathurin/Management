import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';


export default class TinyLineCharts extends PureComponent {
  constructor(props) {
    super(props);
    }
  render() {
    return (
      <div>
      <AreaChart
        width={200}
        height={50}
        data={this.props.data}
        baseValue={"dataMin"}
        margin={{
          top: 0, right: 0, left: 0, bottom: 0,
        }}
      >
        <defs>
      <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#00FF00" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#00FF00" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorDo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
    </linearGradient>
      </defs>
        <Area type="monotone" dataKey="gains" stroke="#8884d8" fillOpacity={1} fill={this.props.color} />
      </AreaChart>
      </div>
    );
  }
}
