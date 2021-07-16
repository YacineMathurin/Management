import React, { Component } from "react";
import {
  LineChart,
  Line,
  Cell,
  Bar,
  Brush,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ComposedChart,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



export default class TestLineChartFormeComplet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      nbCourse: this.props.nbCourse,
    }
  }
  
  

  render() {
    return (
      
      <ResponsiveContainer width={'99%'} height={300}>
   
      <LineChart
      
        data={this.props.data}
      >
        <XAxis dataKey="cle" tick={false} />
        <Tooltip formatter={(value) => value + " points"} />       
        
        <Line strokeWidth={2} dataKey="val"  stroke="#8884d8"  >
        
        </Line>
        <Brush startIndex={this.state.nbCourse - 40} />
      </LineChart>
   
      </ResponsiveContainer>    
    );
  }
}