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
                <span> Mois : {e.payload[0].payload["date"]}</span><br/>
                <span>Nombre de courses : {e.payload[0].payload["occurrence"]}</span><br/>
                <span>Réussite mensuelle : {e.payload[0].payload["reussite"] + "%"}</span>
                
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
        width={805}
        maxBarSize={15}
        barSize={15}
        height={300}
        data={this.props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <Tooltip content={this.customTooltipOnYourLine}/>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={false} />
        <YAxis />
        <Tooltip  />
        <Legend />
        
        <Bar name="Réussite mensuelle" dataKey="reussite" label="" fill="#3F51B5">
        {
            this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={"#3F51B5"}/>
            ))
          }
        </Bar>

         <Bar name="Nombre de courses" dataKey="occurrence" label="" fill="#8f9ef2">
        {
            this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={"#8f9ef2"}/>
            ))
          }
        </Bar>

      </BarChart>
    );
  }
}