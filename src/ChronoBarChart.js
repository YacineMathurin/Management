import React, { Component } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  ResponsiveContainer,
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
      <ResponsiveContainer height='100%' width='100%' aspect={4.0/2}>
      <BarChart
        data={this.props.data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
      <CartesianGrid strokeDasharray="3 3" />
        <XAxis name="ReductionKm" dataKey="reduc" />
        <YAxis />
        <Tooltip />
        <Bar name="Nombre de chrono" dataKey="nombre" label="" fill="#3F51B5">
        {
            this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.nombre > 0 ? "#3F51B5":"#d62728"}/>
            ))
          }
        </Bar>

      </BarChart>
      </ResponsiveContainer>
    );
  }
}