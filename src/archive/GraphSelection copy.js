import Box from '@material-ui/core/Box';
import MUIDataTable from "mui-datatables";
import React, { PureComponent } from 'react';
import { Bar, Brush, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default class GraphSelection extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
          courseSelected: 0
      }
    }
    

    // const CustomTooltip = ({ active, payload, label }) => {
    //     if (active) {
    //       return (
    //         <div className="custom-tooltip">
    //           <p className="label">{`${label} : ${payload[0].value}`}</p>
    //           <p className="intro">{'${jockey} '}</p>
    //           <p className="desc">Anything you want can be displayed here.</p>
    //         </div>
    //       );
    //     }

  handleBrushChange(index) {
    const ref = this.props.userSelection.backtestDTO[0].evolution.bilan[index.startIndex].solde
    const length = this.props.userSelection.backtestDTO[0].evolution.bilan.length
    for (let i = 0; i < length; i++) {
      // if (ref < 0) {
      //   this.props.userSelection.backtestDTO[0].evolution.bilan[i].solde = this.props.userSelection.backtestDTO[0].evolution.bilan[i].solde + ref;
      //  } 
      //  else {
          this.props.userSelection.backtestDTO[0].evolution.bilan[i].solde = this.props.userSelection.backtestDTO[0].evolution.bilan[i].solde - ref;
      //  }
    }
  }

    handleBarClick = (data, index) => {
      console.log("click on bar - " + index)
      this.setState({
        courseSelected: index,
      });
    }

  render() {
  return (<div>
    <Box display="flex" flexDirection="column" bgcolor="background.paper">
    <Box p={1} bgcolor="white">
    <ResponsiveContainer>
    <ComposedChart
    // width={ this.props.width }
    // height={ this.props.height }
    data={ this.props.userSelection.backtestDTO[0].evolution.bilan }
    margin={{
      top: 20, right: 0, bottom: 20, left: 0,
    }}>
    <CartesianGrid stroke="#f5f5f5" />
    <XAxis dataKey="date" label={{ value: 'Courses', position: 'insideBottomRight', offset: 0 }} />
    <YAxis yAxisId="left" label={{ value: 'Gain cumule (euros)', angle: -90, position: 'insideLeft' }} />
    <YAxis yAxisId="right" orientation="right" label={{ value: 'Perdant / Gagnant', angle: 90, position: 'insideRight' }} />
    <Tooltip />
    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
    <Bar yAxisId="right" dataKey="gain" barSize={20} fill="#8884d8" onClick={ this.handleBarClick} />
    <Line yAxisId="left" type="monotone" dataKey="solde" stroke="#ff7300" strokeWidth="3" />
    <Brush dataKey="date" heigth={30} stroke="#8884d8" onChange={ this.handleBrushChange.bind(this)} />
  </ComposedChart>
  </ResponsiveContainer>
</Box>
<Box>

      <MUIDataTable
      title={"Details course"}
      const data = { [
        ["Code", "code course = " + this.state.courseSelected ],
        ["Heure", "heure course = " + this.state.courseSelected ],
        ["Hippo", "Hippo course = " + this.state.courseSelected ],
        ["Autre", "code course = " + this.state.courseSelected ],
       ] }
      columns={ ["Champs", "Valeurs"] }
/>
      </Box>
      </Box>
  </div>

  )

}
}
