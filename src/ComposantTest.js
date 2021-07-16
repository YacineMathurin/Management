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
import Alert from '@material-ui/lab/Alert';
import Rating from '@material-ui/lab/Rating';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Snackbar from '@material-ui/core/Snackbar';


//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class ComposantTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      idStats : props.idStats,
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
    fetch( Const.URL_SELECTION_DETAILS_WS + `?token=${this.props.apiKey}&id=${this.state.idStats}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ donnees: data[0]})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    }) 
   
  } 

  putFavori= () => {
    fetch( Const.URL_PUT_FAVORI + `?token=${this.props.apiKey}&id_selection=${this.state.idStats}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.props.drawerCloseTest();
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
            <Grid container style={{cursor:"pointer"}}>
            <Grid item xs={1}>
            <ToggleButton style={{margin:"0.5em"}} onClick={this.props.drawerCloseTest} value="Fermer" aria-label="Fermer">
              <CloseIcon fontSize="small" />
            </ToggleButton>
          </Grid>
          <Grid item xs={10}>
            <div style={{marginLeft:"1.5em", marginTop:"0.7em", float:"left"}}>
            <span style={{cursor:"pointer"}} >RAPPORT DE PERFORMANCE</span>
          <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">CALCULÉ PAR L' ALGORITHME <i><b>DTF SCORE</b></i> ©</Typography>
            </div> 
          </Grid>
          <Grid item xs={1}>
            <ToggleButton style={{margin:"0.5em", float:"right"}} onClick={() => this.putFavori()} value="Fermer" aria-label="Fermer">
              <ListAltIcon fontSize="small" />
            </ToggleButton>
          </Grid>

          <Grid item xs={12}>
            <TableStatsGlobalTest avatar={this.state.donnees.avatar} requete={this.state.donnees.requete} dateDernPari={this.state.donnees.dateDernPari} activite={this.state.donnees.activite} idStats={this.state.idStats} titre={"RÉUSSITE DE LA SÉLECTION"} nbGagnant={this.state.donnees.totalGagnant} nbPlace={this.state.donnees.totalPlace} rubrique={"CALCULÉ"} participation={this.state.donnees.totalCourse} gagnant={this.state.donnees.reussiteG} place={this.state.donnees.reussite} />
          </Grid>

          <Grid item xs={12}>
           <div style={{margin:"0.5em"}}>
           <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>PRONOSTICS</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">AUJOURD'HUI ET DEMAIN</Typography></TableCell>
                </TableRow>
                </TableHead>
              <TableBody>
              {(this.state.donnees.pronosticsJour.programmePartants != ("")) && ( this.state.donnees.pronosticsJour.programmePartants.map((s) => {
                          
                          return (
                            <TableRow>
                                <TableCell width="30px" align="left">N°{s.num}</TableCell>
                                <TableCell align="left">{s.trotteur}<br/>
                                <Typography color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">AUJOURD'HUI - {s.hippodrome.split(" - ")[0]} - {s.course.split(" - ")[0]} - {s.hippodrome.split(" - ")[1].replace(":", "h")}</Typography>
                                </TableCell>
                                <TableCell width="30px" align="right"><Rating name="read-only" max={3} size="small" value={s.forme} readOnly /></TableCell>
                                
                                
                                
                            </TableRow>
                          )
                })) }
                {(this.state.donnees.pronosticsDemain.programmePartants != ("")) && ( this.state.donnees.pronosticsDemain.programmePartants.map((s) => {
                          
                          return (
                            <TableRow>
                                <TableCell width="30px" align="left">N°{s.num}</TableCell>
                                <TableCell align="left">{s.trotteur}<br/>
                                <Typography color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">DEMAIN - {s.hippodrome.split(" - ")[0]} - {s.course.split(" - ")[0]} - {s.hippodrome.split(" - ")[1].replace(":", "h")}</Typography>
                                </TableCell>
                                <TableCell width="30px" align="right"><Rating name="read-only" max={3} size="small" value={s.forme} readOnly /></TableCell>
                                
                                
                                
                            </TableRow>
                          )
                })) }
                  {(this.state.donnees.pronosticsJour.programmePartants == ("") ) && (this.state.donnees.pronosticsDemain.programmePartants == ("") ) && (
                    <TableRow>
                      <TableCell>
                        <Alert severity="info">Aucun pronostics</Alert>
                      </TableCell>
                    </TableRow>
                  )}
                  </TableBody>
                  </Table>
                </TableContainer>
                </div>
          </Grid>  

          <Grid item xs={12}>
            <TableMetric data={this.state.donnees}/>
          </Grid> 


           <Grid item xs={12}>
           <div style={{margin:"0.5em"}}>
           <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>HISTORIQUE</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">HISTORIQUE DES 20 DERNIÈRES COURSES (PMU)</Typography></TableCell>
                </TableRow>
                </TableHead>
              <TableBody>
              <TableRow>
                <TableCell>
                  <TableHistoriqueSelection donnees={this.state.donnees.historique}/>
                  </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                </TableContainer>
                </div>
          </Grid>  

          </Grid>
          )}

     
           { (this.state.donnees == null) && (<div style={{marginTop:"2em"}}><center><CircularProgress disableShrink /></center></div>) }
        </div>
    );

  }
}

export default ComposantTest;