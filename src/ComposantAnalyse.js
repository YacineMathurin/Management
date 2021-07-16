import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MUIDataTable from "mui-datatables";
import React from "react";
import * as Const from './Constant';
import ExtensionIcon from '@material-ui/icons/Extension';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NumberFormat from 'react-number-format';
import Avatar from '@material-ui/core/Avatar';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import WarningIcon from '@material-ui/icons/Warning';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import TinyPieChart from './TinyPieCharts';
import Grid from '@material-ui/core/Grid';
import TableStats from './TableStats';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CloseIcon from '@material-ui/icons/Close';
import TableStatsGlobal from './TableStatsGlobal';
import TableStatsGlobalTest from './TableStatsGlobalTest';
import TableMetric from './TableMetric';
import TableHistoriqueSelection from './TableHistoriqueSelection';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableProfils from './TableProfils';

//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class ComposantAnalyse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      requete: this.props.requete,
      drawerCloseAnalyse : this.props.drawerCloseAnalyse,
    }
  }

  callbackDetailsSelection(data, expandedRows) {
    // save the expandedRows
    // expandedRows is string format
    var arr = []
    var tmp = JSON.parse(expandedRows)
    for (var i=0; i < tmp.length; i++) {
      arr.push(tmp[i]['index'])
    }
    localStorage.setItem('expandedRows', JSON.stringify(arr))
    this.props.callbackDetailsSelection(data)
  }

  componentWillReceiveProps(props) {
    this.setState({ synthese: props.synthese })
    
  }


  componentDidMount() {
    fetch(Const.URL_ANALYSE + `?token=${this.state.apiKey}&requete=${this.state.requete}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        
        if(data.etat == "OK"){
          this.setState({ donnees: data})
        }else if(data.etat == "OVERSIZE_ANALYSE"){
          this.props.drawerCloseAnalyse("OVERSIZE_ANALYSE")
        }
        
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
   
  } 


  render() {
  
    return (
        <div>
          { (this.state.donnees != null && this.state.donnees.etat == "OK" ) && (
           <Grid container>
           <Grid item xs={1}>
           <ToggleButton style={{margin:"0.5em"}} onClick={this.props.drawerCloseAnalyse} value="Fermer" aria-label="Fermer">
             <CloseIcon fontSize="small" />
           </ToggleButton>
         </Grid>
         <Grid item xs={8}>
           <div style={{marginLeft:"1.5em", marginTop:"0.7em", float:"left"}}>
           <span style={{cursor:"pointer"}} >PROFIL DE LA SÉLECTION</span>
         <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">CALCULÉ PAR DATATURF EN {this.state.donnees.tempsExec} seconde(s)</Typography>
           </div> 
         </Grid>
         <Grid item xs={12}>
            <TableProfils data={this.state.donnees}/>

         </Grid>
         </Grid>
          )}
           { (this.state.donnees == null) && (<div style={{marginTop:"2em"}}><center><CircularProgress disableShrink /></center></div>) }
        </div>
    );

  }
}

export default ComposantAnalyse;