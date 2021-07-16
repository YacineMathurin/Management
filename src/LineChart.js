import React, { Component } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";


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
        width={590}
        height={276}
        data={this.props.data}
        margin={{ top: 2, right: 30, left: 0, bottom: 5 }} 
      >
        <Tooltip formatter={(value, name, props) => value + ""} />

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={false} />
        <YAxis />
        <Tooltip  />
        
        <Line dataKey="forme" type="monotone" strokeWidth={2}></Line>

      </LineChart>
      
    );
  }
}