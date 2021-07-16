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
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Const from './Constant';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';


export default class DialogOuvrir extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: props.apiKey,
      
    }
  }

  handleDialogOuvrirOpen = () => {
    this.setState({ openDialogOuvrir: true })
  }


  handleDialogOuvrirClose = () => {
    this.setState({ openDialogOuvrir: false })
  }





  componentDidMount() {
   
  } 

  handleClic = () => {
    alert("test")
  }

  render() {
    return (
      <Dialog      
      open={this.state.openDialogOuvrir}
      close={this.state.handleDialogOuvrirClose}
      >
      <div>
      <DialogTitle>
      <Grid container>
        <Grid item xs={10}>
        <IconButton style={{float:"left"}} size="small" aria-label="close" >
            <FolderOpenIcon  />
          </IconButton> 
        </Grid>
        <Grid item xs={2}>
          <IconButton style={{float:"right"}} size="small" aria-label="close"  >
            <CloseIcon fontSize="small" />
          </IconButton>     
        </Grid>
      </Grid>
     
      </DialogTitle>
      <DialogContent dividers>
      <DialogContentText>
       
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      
      </DialogActions> </div>
      </Dialog>
    );
  }
}
