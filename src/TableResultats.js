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
import TableTopStatsRecherche from './TableTopStatsRecherche';
import TableTopStatsDemain from './TableTopStatsDemain';


export default class TableResultats extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tab: 0,
      apiKey: this.props.apiKey,
      listeRecherche: this.props.listeRecherche,
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
            <Tab size="small" label="Résultats"></Tab>
           
          </Tabs>
        </Paper>
        <div style={{marginTop:"0.5em"}}>
          <TableTopStatsRecherche listeStats={this.state.listeRecherche} apiKey = {this.state.apiKey }/>
          </div>
        
      </div>
    );
  }
}