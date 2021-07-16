import React, { Component } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }
  
  

  render() {
    return (
      <BarChart
        width={805}
        maxBarSize={15}
        barSize={15}
        height={300}
        data={this.props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <Tooltip formatter={(value, name, props) => value + " €"} />

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={false} />
        <YAxis />
        <Tooltip  />
        <Legend />
        
        <Bar name="Gain par course" dataKey="gain" label="" fill="#3F51B5">
        {
            this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.gain > 0 ? "#3F51B5":"#d62728"}/>
            ))
          }
        </Bar>

      </BarChart>
    );
  }
}