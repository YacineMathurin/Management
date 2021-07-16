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
import TableHistoriqueDriver from './TableHistoriqueDriver';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TestLineChart from './TestLineChart';
import TestLineChartForme from './TestLineChartForme';
import TableProfilStats from './TableProfilStats';

//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class ComposantStatsDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date : this.props.date,
      apiKey : props.apiKey,
      driver : this.props.driver,
      drawerClose : this.props.drawerClose,
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
    // call ws getStats
    
    fetch(Const.URL_STATS_DRIVER + `?token=${this.state.apiKey}&driver=${this.state.driver}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ donnees: data.historique})
        this.setState({ cotations: data.cotation})
        this.setState({ formes: data.forme})
        this.setState({ data : data })
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  } 

  render() {
  
    return (
        <div>
          { (this.state.donnees != null ) && (
            <Grid container>
            <Grid item xs={1}>
            <ToggleButton style={{margin:"0.5em"}} onClick={this.props.drawerClose} value="Fermer" aria-label="Fermer">
              <CloseIcon fontSize="small" />
            </ToggleButton>
          </Grid>
          <Grid item xs={11}>
            <div style={{marginLeft:"-0.5em", marginTop:"0.7em"}}>
              <span style={{cursor:"pointer"}} >{this.props.driver}</span>
              <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2"><span style={{cursor:"pointer"}} >PROFIL ET STATISTIQUES AVANCÉES</span></Typography>
            </div> 
          </Grid>
          { (this.state.donnees != null) && (
          <Grid item xs={12}>
             <div style={{margin:"0.5em"}}>
             <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>HISTORIQUE</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">LES 60 DERNIÈRES PERFORMANCES PMU DU DRIVER</Typography></TableCell>
                </TableRow>
                </TableHead>
              <TableBody>
              <TableRow>
              <TableCell>
                <TableHistoriqueDriver apiKey={this.state.apiKey} synthese={this.state.donnees} driver={this.state.driver}/>
              
                  </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                </TableContainer>
                </div>
          </Grid>
          )}
          { (this.state.cotations != null) && (
          <Grid item xs={6}>
             <div style={{margin:"0.5em"}}>
             <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>COTATION PMU</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">COTATION PMU DES TROTTEURS DU DRIVER</Typography></TableCell>
                </TableRow>
                </TableHead>
              <TableBody>
              <TableRow>
              <TableCell>
                  <TestLineChart data={this.state.cotations}/>
              
                  </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                </TableContainer>
                </div>
          </Grid>
          )}

        { (this.state.formes != null) && (
          <Grid item xs={6}>
             <div style={{margin:"0.5em"}}>
             <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>INDICE DE FORME</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">LA FORME DES TROTTEURS DU DRIVER</Typography></TableCell>
                </TableRow>
                </TableHead>
              <TableBody>
              <TableRow>
              <TableCell>
              <TestLineChartForme data={this.state.formes}/>
              
                  </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                </TableContainer>
                </div>
          </Grid>
          )}

    { (this.state.data != null) && (
          <Grid item xs={12}>
             <div style={{margin:"0.5em"}}>
             <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>VUE HIPPODROME</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">RÉUSSITE DU DRIVER SUR LES HIPPODROMES</Typography></TableCell>
                </TableRow>
                </TableHead>
              <TableBody>
              <TableRow>
              <TableCell>
              <TableProfilStats donnees={this.state.data.optimiseurHippodrome} />
              
                  </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                </TableContainer>
                </div>
          </Grid>

          )}
{ (this.state.data != null) && (
          <Grid item xs={12}>
             <div style={{margin:"0.5em"}}>
             <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>VUE ENTRAINEUR</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">RÉUSSITE DU DRIVER AVEC LES ENTRAINEURS</Typography></TableCell>
                </TableRow>
                </TableHead>
              <TableBody>
              <TableRow>
              <TableCell>
              <TableProfilStats donnees={this.state.data.optimiseurEntraineur} />
              
                  </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                </TableContainer>
                </div>
          </Grid>
   )}

 { (this.state.data != null) && (
          <Grid item xs={12}>
             <div style={{margin:"0.5em"}}>
             <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>VUE TROTTEUR</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">RÉUSSITE DU DRIVER AVEC LES TROTTEURS</Typography></TableCell>
                </TableRow>
                </TableHead>
              <TableBody>
              <TableRow>
              <TableCell>
              <TableProfilStats donnees={this.state.data.optimiseurTrotteur} />
              
                  </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                </TableContainer>
                </div>
          </Grid>
   )}



         </Grid>
         
          )}
          { (this.state.donnees == null) && (<div style={{marginTop:"2em"}}><center><CircularProgress disableShrink /></center></div>) }
        </div>
    );

  }
}

export default ComposantStatsDriver;