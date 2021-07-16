import React, { Component } from "react";
import {
  LineChart,
  Line,
  Cell,
  XAxis,
  ResponsiveContainer,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
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
      <ResponsiveContainer height='80%' width='100%' aspect={6.0/2}>
      <AreaChart
     
        data={this.props.data}
      >
        <Tooltip formatter={(value, name, props) => value} />

        <CartesianGrid strokeDasharray="3 3" />
      
        <XAxis dataKey="date" tick={false} />
        <Tooltip  />
        
        <Area name="point" strokeWidth={2} dataKey="point" label="" fill="#3F51B5"></Area>

      </AreaChart>
      </ResponsiveContainer>
    );
  }
}