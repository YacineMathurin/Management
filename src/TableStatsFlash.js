import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import NotificationsOffOutlinedIcon from '@material-ui/icons/NotificationsOffOutlined';
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import MUIDataTable from "mui-datatables";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TinyPieChartTrio from './TinyPieChartsTrio';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from "react";
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


import * as Const from './Constant';

//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class TableStatsFlash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      synthese : this.props.synthese,
      openDialog : false,
      selectionEffacer : "",
      filtreNotif: "",
    }
    
  }

  componentDidMount() {
    this.provideDossier();
  } 

  handleCallbackRetourDetails(requete, typePari) {
    this.props.callbackRetourDetails(requete, typePari)
  }


  provideDossier(){
    var action = "LIST";

    if(this.state.filtreNotif == "filtrer"){
      action="LIST_FILTRER_NOTIF"
    }

    if(this.state.filtreNotif == "euro"){
      action="LIST_FILTRER_EURO"
    }
    
    fetch( Const.URL_WS_PROVIDE_DOSSIER + `?token=0000&ACTION=${action}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
      this.setState({ synthese: data})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }

  handleFiltreNotif  = (event, newDate) => {
    this.setState( { filtreNotif: newDate })
    this.state.filtreNotif = newDate;
    this.provideDossier();
  }

  handleDialogOpen = (id) => {
    this.setState( {openDialog: true })
    this.setState( {selectionEffacer: id })
  }

  handleDialogClose = () => {
    this.setState( {openDialog: false })
  }

  retour(data) {
    // return data = null to go back to selection
    // if not null >> go to edit selection (in this case data = requete to edit)
    localStorage.setItem("lastQuery", data);
    this.props.callbackRetourDetails(data)
  }
  
   callDeleteSelection = () => {
    fetch(Const.URL_WS_DELETE_DOSSIER + `?token=0000&ACTION=DEL&ID=${this.state.selectionEffacer}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } 
      
      this.setState( {selectionEffacer: "" })
      this.setState( {openDialog: false })
      this.provideDossier();

    })
    .catch((error) => {
      console.log('Request failed', error)
    })
   
  }

  render() {
 
    return (
      <div style={{width:'100%'}}>
        
        <Grid container  spacing={2}>
        
      { (this.state.synthese != null) && ( this.state.synthese.map((s) => {
          return ( 
            <Grid item xs={6}>
            <Card>
            <CardContent>
            <Typography onClick={() => this.retour(s.requete) } style={{cursor:"pointer"}}  variant="body2" component="p">
              {s.label}
            </Typography>
            <Grid container  spacing={0}>
              <Grid item xs={3}>
              <img  style={{marginTop:"1em"}} src={s.image}/>
              </Grid>
              <Grid item xs={8} onClick={() => this.retour(s.requete) } style={{cursor:"pointer"}} >
                <Typography style={{marginTop:"0.5em"}}  color="textSecondary" gutterBottom>
                <i>{s.description}</i>
                <br/><br/>
          <i>Simple gagnant : <span style={{color:"#3F51B5"}}>{s.reussite}%</span> de réussite</i>
          <br/><i>Simple placé : <span style={{color:"#3F51B5"}}>{(s.reussite + s.reussitePlace)}%</span> de réussite</i>
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
             

              { (s.engagement > 0 ) && (
              <IconButton onClick={() => this.retour(s.requete) } size="small" aria-label="delete">
              <Badge badgeContent={s.engagement} color="primary">
              <img width="18" height="18" src="./images/binoculars2.png"/>
              </Badge>
              </IconButton>
               )}

              { (s.engagement == 0 ) && (
              <IconButton onClick={() => this.retour(s.requete) } size="small" aria-label="delete">
                 <img width="18" height="18" src="./images/binoculars2.png"/>            
              </IconButton>
               )}

             
              </Grid>
            </Grid>
            </CardContent>
           
          </Card>
            </Grid>
          );
       })) }
        </Grid>


      { (this.state.synthese == null) && (<center><CircularProgress disableShrink /></center>) }

      <Dialog
open={this.state.openDialog}
onClose={this.handleDialogClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-description">
  Êtes-vous sûr de vouloir supprimer cette sélection ?
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button size="small" onClick={this.handleDialogClose} color="primary">
    Annuler
  </Button>
  <Button size="small" onClick={this.callDeleteSelection} variant="contained"  color="primary" autoFocus>
    Valider
  </Button>
</DialogActions>
</Dialog>

    </div>




    );

  }
}

export default TableStatsFlash;
