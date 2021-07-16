import React, { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import TableTopStats from './TableTopStats';
import TableTopStatsDemain from './TableTopStatsDemain';

export default class TableEngagement extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tab: 0,
      jourVisible: "",
      demainVisible: "none",
      apiKey: this.props.apiKey,
      listeStats: this.props.listeStats,
    }
  }

  handleChangeTab = (event, newValue) => {
    this.state.tab = newValue
    this.setState({ tab: newValue})  
    if(newValue == 1){
      this.setState({ jourVisible: "none"})  
      this.setState({ demainVisible: ""})  
    }
    if(newValue == 0){
      this.setState({ jourVisible: ""})  
      this.setState({ demainVisible: "none"})  
    }
    
}

  render() {
    return (
      <div>
        <Paper square>
          <Tabs
            size="small"
            value={this.state.tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChangeTab}
            aria-label="disabled tabs example"
          >
            <Tab size="small" label="Aujourd'hui"></Tab>
          </Tabs>
        </Paper>
        <div style={{display:this.state.jourVisible, marginTop:"0.5em"}}>
          <TableTopStats listeStats={this.state.listeStats} apiKey = {this.state.apiKey }/>
        </div>
        <div style={{display:this.state.demainVisible, marginTop:"0.5em"}}>
          <TableTopStatsDemain listeStats={this.state.listeStats} apiKey = {this.state.apiKey }/>
        </div>
      </div>
    );
  }
}