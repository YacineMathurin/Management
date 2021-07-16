import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import * as Const from './Constant';

export default class DialogEnregistrer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: props.apiKey,
      openDialogSave: props.open,
      onClose: props.onClose,
      requete: props.requete,
      notification: props.notification,
    }
    
  }

  handleDialogSaveOpen = () => {
    this.setState({ openDialogSave: true })
  }

  handleDialogSaveClose = () => {
    this.props.onClose(false)
  }

  handleTextFieldTitle = (e) => {
    this.setState({ titleSaveSelection: e.target.value })
  }
  
  handleTextFieldDescription = (e) => {
    this.setState({ descriptionSaveSelection: e.target.value })
  }

  handleCallSave = () => {
    
    fetch(Const.URL_WS_SAVE_DOSSIER + `?token=${this.state.apiKey}&ACTION=SAVE&REQUETE=${this.state.requete}&LABEL=${this.state.titleSaveSelection}&DESCRIPTION=${this.state.descriptionSaveSelection}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.handleDialogSaveClose()
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })

    this.props.onClose(false)
    this.props.notification()
  }

  render() {
    return (

      <Dialog      
      open={this.state.openDialogSave}
      onClose={this.handleDialogSaveClose}
      >
      <div>
      <DialogTitle>
      <Grid container>
        <Grid item xs={10}>
        <IconButton style={{float:"left"}} size="small" aria-label="close" >
            <SaveIcon  />
          </IconButton> 
        </Grid>
        <Grid item xs={2}>
          <IconButton style={{float:"right"}} size="small" aria-label="close" onClick={this.handleDialogSaveClose} >
            <CloseIcon fontSize="small" />
          </IconButton>     
        </Grid>
      </Grid>
     
      </DialogTitle>
      <DialogContent dividers>
      <DialogContentText>
        <Grid container>
          <Grid style={{marginTop:"0.5em"}} item xs={12}>
          <TextField  size="small" defaultValue=" " value={this.state.titleSaveSelection}  onChange={this.handleTextFieldTitle} fullWidth id="outlined-basic" label="Nom de la sélection" variant="outlined" />
          </Grid>
          <Grid style={{marginTop:"1.5em"}} item xs={12}>
          <TextField
           size="small"
          value={this.state.descriptionSaveSelection}
          onChange={this.handleTextFieldDescription}
          fullWidth
          id="filled-multiline-static"
          label="Une courte description"
          multiline
          rows={4}
          defaultValue=" "
          variant="outlined"
        />
        </Grid>
        </Grid>
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button size="small" onClick={this.handleDialogSaveClose} color="primary" autoFocus>Fermer</Button>
      <Button size="small" onClick={this.handleCallSave} variant="contained"  color="primary" autoFocus>Enregistrer</Button>
      </DialogActions> </div>
      </Dialog>
      

    
    )};
}
