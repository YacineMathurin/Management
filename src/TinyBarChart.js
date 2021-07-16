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
        width={470}
        maxBarSize={8}
        barSize={8}
        height={20}
        data={this.props.data}
        margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
      >
    
        <Bar name="G" dataKey="valeur" label="" fill="#3F51B5">
        {
            this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.valeur > 0 ? "#3F51B5":"#d62728"}/>
            ))
          }
        </Bar>

      </BarChart>
    );
  }
}