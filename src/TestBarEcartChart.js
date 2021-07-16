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
  

  customTooltipOnYourLine(e){
    if (e.active && e.payload!=null && e.payload[0]!=null) {
          return (<div style={{backgroundColor:"white", borderWidth:"1px", borderColor:"black", borderStyle:"solid"}} className="custom-tooltip">
                <div style={{margin:"5px"}}>
                <span> Nombre de paris perdant consécutif : {e.payload[0].payload["ecart"]}</span><br/>
                <span> Nombre d'observation : {e.payload[0].payload["nbre"]}</span>
                </div>
              </div>);
        }
    else{
       return "";
    }
  }
  

  render() {
    return (
      <BarChart
        width={400}
        maxBarSize={15}
        barSize={15}
        height={230}
        data={this.props.data}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      >
        <Tooltip content={this.customTooltipOnYourLine} />

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ecart" tick={false} />
        <YAxis />
        <Tooltip  />
        <Legend />
        
        <Bar name={this.props.label} dataKey="nbre" label="" fill="#3F51B5">
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