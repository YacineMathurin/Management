import React, { Component } from "react";
import {
  AreaChart,
  Area,
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
      <AreaChart
        width={805}
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
        
        <Area dataKey="gain" label="" fill="#3F51B5">
        </Area>

      </AreaChart>
    );
  }
}