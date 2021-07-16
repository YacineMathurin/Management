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
        width={1050}
        maxBarSize={15}
        barSize={15}
        height={350}
        data={this.props.data}
        margin={{ top: 15, right: 0, left: 0, bottom: 5 }}
      >
        <Tooltip formatter={(value, name, props) => value + " courses de trot"} />

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={false} />
        <YAxis />
        <Tooltip  />
        <Legend />
        
        <Bar name="Mises à jour" dataKey="nombre" label="" fill="#3F51B5">
        {
            this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={"#3F51B5"}/>
            ))
          }
        </Bar>

      </BarChart>
    );
  }
}