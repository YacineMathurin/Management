import React, { Component } from "react";
import {
  LineChart,
  Line,
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
      <LineChart
        width={400}
        height={200}
        data={this.props.data}
      >
        <Tooltip formatter={(value, name, props) => value} />

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={false} />
        <Tooltip  />
        
        <Line name="Indice de forme" strokeWidth={2} dataKey="forme" label="" fill="#3F51B5"></Line>

      </LineChart>
    );
  }
}