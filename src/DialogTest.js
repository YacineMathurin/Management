import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import DatePickerDebut from './DatePickerDebut';
import DatePickerFin from './DatePickerFin';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Alert from '@material-ui/lab/Alert';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import TableResultats from './TableResultats';
import * as Const from './Constant';
import CircularProgress from '@material-ui/core/CircularProgress';
import ToggleButton from '@material-ui/lab/ToggleButton';


export default class DialogTest extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: props.apiKey,
      openDialogTest: props.open,
      onClose: props.onClose,  
      nomTrotteur: props.nomTrotteur,
    }
    
  }

  handleDialogTestOpen = () => {
    this.setState({ openDialogTest: true })
  }

  handleDialogTestClose = () => {
    this.props.onClose(false)
  }

  handleDateDebut = (e) => {
    this.setState({ dateDebut: e })
  }

  handleDateFin = (e) => {
    this.setState({ dateFin: e })
  }

  componentDidMount() {
    this.provideRecherche(); 
  } 

  provideRecherche = () =>{
    this.setState({ listeRecherche: null})
    var key = this.state.nomTrotteur;
    var course = "undefined";
    var model = "";
    var activite = "0,100";
    var reussite = "0,100";
    var rapportMoy = "0,100";
    var ecartMax = "0,100";
    var indicateurEcart = "0,200";
    var engagement = "true";
    var pariGagnant = "undefined";

    fetch(Const.URL_BIBLIOTHEQUE_RECHERCHE + `?token=${this.props.apiKey}&course=${course}&model=${model}&key=${key}&activite=${activite}&reussite=${reussite}&rapportMoy=${rapportMoy}&ecartMax=${ecartMax}&ecartIndicateur=${indicateurEcart}&engagement=${engagement}&pariGagnant=${pariGagnant}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ listeRecherche: data})
        this.setState({ rechercheVisible: ""})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }

  render() {
    return (
      <Dialog  
      fullWidth="true"
      maxWidth="lg"
      open={this.state.openDialogTest}
      onClose={this.handleDialogTestClose}
      scroll="body"
      >
      <div>
      <DialogTitle>
      <Grid container>
        <Grid item xs={10}>
       
          <span style={{color:"#262626"}}>{this.state.nomTrotteur}</span> 
        </Grid>
        <Grid item xs={2}>
        <ToggleButton style={{float:"right"}} onClick={this.handleDialogTestClose} value="Fermer" aria-label="Fermer">
              <CloseIcon fontSize="small" />
            </ToggleButton>
          
        </Grid>
      </Grid>
     
      </DialogTitle>
      <DialogContent dividers>
      <DialogContentText>
       
      { (this.state.listeRecherche != null)  && (
              <div>
              <TableResultats listeRecherche={this.state.listeRecherche} apiKey = {this.state.apiKey }/>
              </div>
            ) }
          { (this.state.listeRecherche == null) && (<div style={{margin:"0.5em"}}><center><CircularProgress disableShrink /></center></div>) }
        
      </DialogContentText>
      </DialogContent>
       </div>
      </Dialog>
    );
  }
}
