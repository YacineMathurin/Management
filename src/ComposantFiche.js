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



//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class ComposantFiche extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date : this.props.date,
      apiKey : props.apiKey,
      trotteur : this.props.trotteur,
      driver : this.props.driver,
      drawerClose : this.props.drawerClose,
      entraineur : this.props.entraineur,
      hippodrome : this.props.hippodrome,
      dai: 52,
      social: 4,
      donnees : null,
      synthese : this.props.synthese,
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
    
    fetch(Const.URL_PROVIDE_STATISTIQUES_PARTANTS + `?token=${this.state.apiKey}&date=${this.state.date}&trotteur=${this.state.trotteur}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ donnees: data})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  } 

  moreStatsTrotteur = () => {
    this.props.statsTrotteur()
  }

  moreStatsDriver = () => {
    this.props.statsDriver()
  }

  moreStatsEntraineur = () => {
    this.props.statsEntraineur()
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
          <Grid item xs={8}>
            <div style={{marginLeft:"1.5em", marginTop:"0.7em", float:"left"}}>
              <span style={{cursor:"pointer"}} >{this.props.trotteur}</span>
              <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2"><span style={{cursor:"pointer"}} >{this.props.driver}</span> / <span style={{cursor:"pointer"}} >{this.props.entraineur}</span></Typography>
            </div> 
          </Grid>
         
          <Grid item xs={1}>
          { (this.state.donnees.musique == "" || this.state.donnees.musique.includes("IN") ) && (
            <div style={{marginTop:"0.7em"}}>
               <TrendingFlatIcon style={{color:"grey", width:"32px", height:"32px"}}/>
            </div>
          )}
          { (this.state.donnees.forme >= 1  && this.state.donnees.forme < 5) && (
            <div style={{marginTop:"0.7em"}}>
              <TrendingUpIcon style={{color:"#1AA001", width:"32px", height:"32px"}}/>
            </div>
          )}
           { (this.state.donnees.forme >= 5 && this.state.donnees.forme < 9) && (
            <div style={{marginTop:"0.7em"}}>
              <TrendingDownIcon style={{color:"#FF9200", width:"32px", height:"32px"}}/>
            </div>
          )}
          { (this.state.donnees.forme >= 9) && (
            <div style={{marginTop:"0.7em"}}>
               <TrendingDownIcon style={{color:"#D50000", width:"32px", height:"32px"}}/>
            </div>
          )}

          </Grid>

          <Grid item xs={1}>
          { (this.state.donnees.social == 0 ) && (
            <div style={{marginTop:"0.7em"}}>
               <SentimentSatisfiedIcon style={{color:"grey", width:"32px", height:"32px"}}/>
            </div>
          )}
          { (this.state.donnees.social > 0  && this.state.donnees.social <= 10) && (
            <div style={{marginTop:"0.7em"}}>
              <EmojiEmotionsOutlinedIcon style={{color:"#1AA001", width:"32px", height:"32px"}}/>
            </div>
          )}
           { (this.state.donnees.social > 10 && this.state.donnees.social <= 30) && (
            <div style={{marginTop:"0.7em"}}>
              <EmojiEmotionsOutlinedIcon style={{color:"#FF9200", width:"32px", height:"32px"}}/>
            </div>
          )}
          { (this.state.donnees.social > 30) && (
            <div style={{marginTop:"0.7em"}}>
              <SentimentDissatisfiedOutlinedIcon style={{color:"#D50000", width:"32px", height:"32px"}}/>
            </div>
          )}
          </Grid>
          <Grid item xs={1}>
          { (this.state.donnees.dai >= 50 ) && (
            <div style={{marginTop:"0.7em"}}>
            <WarningIcon style={{color:"#D50000", width:"32px", height:"32px"}}/>
            </div>
          )}
          { (this.state.donnees.dai < 50 ) && (
            <div style={{marginTop:"0.7em"}}>
            <WarningIcon style={{color:"#F2F2F2", width:"32px", height:"32px"}}/>
            </div>
          )}
          </Grid>
            <Grid item xs={12}>
            <TableStatsGlobal theme="trotteur" titre="PERFORMANCE DU TROTTEUR" trotteurstats={this.moreStatsTrotteur} rubrique={"CALCULÉ SUR LES SIX DERNIERS MOIS"} participation={this.state.donnees.participation6Mois}  gagnant={this.state.donnees.reussiteGagnant6Mois} place={this.state.donnees.reussitePlace6Mois} show={this.state.donnees.reussiteCinq6Mois} />
          </Grid>
         
          <Grid item xs={12}>
            <TableStats titre="TROTTEUR / HIPPODROME" rubrique={this.props.trotteur + " / "  + this.props.hippodrome } participation={this.state.donnees.hippodrome} gagnant={this.state.donnees.gagnantHippodrome} place={this.state.donnees.placeHippodrome}/>
          </Grid>
         
          <Grid item xs={12}>
          <TableStats titre="TROTTEUR / DRIVER" rubrique={this.props.trotteur + " / "  + this.props.driver } participation={this.state.donnees.trotteurDriver6Mois} gagnant={this.state.donnees.gagnantTrotteurDriver6Mois} place={this.state.donnees.placeTrotteurDriver6Mois}/>
          </Grid>
         
          <Grid item xs={12}>
          <TableStats titre="TROTTEUR / ENTRAINEUR" rubrique={this.props.trotteur + " / "  + this.props.entraineur } participation={this.state.donnees.trotteurEntraineur6Mois} gagnant={this.state.donnees.gagnantTrotteurEntraineur6Mois} place={this.state.donnees.placeTrotteurEntraineur6Mois}/>
          </Grid>
          
          <Grid item xs={12}>
          <TableStats titre="TROTTEUR / DRIVER / ENTRAINEUR" rubrique={this.props.trotteur + " / "  + this.props.driver + " / " + this.props.entraineur } participation={this.state.donnees.trotteurDrvEntr6Mois} gagnant={this.state.donnees.gagnantTrotteurDrvEntr6Mois} place={this.state.donnees.placeTrotteurDrvEntr6Mois}/>
          </Grid>
          
          <Grid item xs={12}>
          <TableStats titre="TROTTEUR / DRIVER / HIPPODROME" rubrique={this.props.trotteur + " / "  + this.props.driver + " / " + this.props.hippodrome } participation={this.state.donnees.hippodromeDriver} gagnant={this.state.donnees.gagnantHippodromeDriver} place={this.state.donnees.placeHippodromeDriver}/>
          </Grid>
          
          <Grid item xs={12}>
          <TableStats titre="TROTTEUR / ENTRAINEUR / HIPPODROME" rubrique={this.props.trotteur + " / "  + this.props.entraineur + " / " + this.props.hippodrome } participation={this.state.donnees.hippodromeEntraineur} gagnant={this.state.donnees.gagnantHippodromeEntraineur} place={this.state.donnees.placeHippodromeEntraineur}/>
          </Grid>
          
          <Grid item xs={12}>
          <TableStats titre="TROTTEUR / DRIVER / ENTRAINEUR / HIPPODROME"  rubrique={this.props.trotteur + " / "  + this.props.driver + " / " + this.props.entraineur + " / " + this.props.hippodrome } participation={this.state.donnees.hippodromeDriverEntraineur} gagnant={this.state.donnees.gagnantHippodromeDriverEntraineur} place={this.state.donnees.placeHippodromeDriverEntraineur}/>
          </Grid>
          <Grid item xs={12}>
            <TableStatsGlobal theme="driver" titre="PERFORMANCE DU DRIVER" driverstats={this.moreStatsDriver} rubrique={"CALCULÉ SUR LES TROIS DERNIERS MOIS"} participation={this.state.donnees.driver3Mois}  gagnant={this.state.donnees.gagnantDriver3Mois} place={this.state.donnees.placeDriver3Mois} show={this.state.donnees.showDriver3Mois} />
          </Grid>
          <Grid item xs={12}>
            <TableStats titre="DRIVER / HIPPODROME" rubrique={this.props.driver + " / "  + this.props.hippodrome } participation={this.state.donnees.driverHippodrome} gagnant={this.state.donnees.gagnantDriverHippodrome} place={this.state.donnees.placeDriverHippodrome}/>
          </Grid>
          <Grid item xs={12}>
            <TableStats titre="DRIVER / ENTRAINEUR" rubrique={this.props.driver + " / "  + this.props.entraineur } participation={this.state.donnees.driverEntraineur3Mois} gagnant={this.state.donnees.gagnantDriverEntraineur3Mois} place={this.state.donnees.placeDriverEntraineur3Mois}/>
          </Grid>
          
          <Grid item xs={12}>
            <TableStatsGlobal theme="entraineur" titre="PERFORMANCE DE L'ENTRAINEUR" entraineurstats={this.moreStatsEntraineur} rubrique={"CALCULÉ SUR LES TROIS DERNIERS MOIS"} participation={this.state.donnees.entraineur3Mois}  gagnant={this.state.donnees.gagnantEntraineur3Mois} place={this.state.donnees.placeEntraineur3Mois} show={this.state.donnees.showEntraineur3Mois} />
          </Grid>
          <Grid item xs={12}>
            <TableStats titre="ENTRAINEUR / HIPPODROME" rubrique={this.props.entraineur + " / "  + this.props.hippodrome } participation={this.state.donnees.entraineurHippodrome} gagnant={this.state.donnees.gagnantEntraineurHippodrome} place={this.state.donnees.placeEntraineurHippodrome}/>
          </Grid>
          </Grid>
          )}
          { (this.state.donnees == null) && (<div style={{marginTop:"2em"}}><center><CircularProgress disableShrink /></center></div>) }
        </div>
    );

  }
}

export default ComposantFiche;