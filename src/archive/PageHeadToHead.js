import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableClassementTrotteur from './TableClassementTrotteur'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import NavBar from './NavBar';
import TableHeadToHead from './TableHeadToHead';

class PageHeadToHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      synthese : null
    }

  }

  classes = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
    
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },

  
    title: {
      flexGrow: 1,
    },
    
  
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      marginTop: '5em',
      // padding: theme.spacing(3),
    },
  }),
);


 deco(){
  localStorage.clear();
  window.location.href = "http://localhost:3000";

}
  handleCallbackViewDetails = (data) => {
    this.props.callbackViewDetails(data)
  } 

  handleCallbackViewEdit = (data) => {
    this.props.callbackViewEdit(data)
  }

  handleCallbackFilterChange = (data) => {
    this.setState( { dataTableSynthese: data })
  }

  render() {
  return (
    <div className={this.classes.root}>
      <CssBaseline />
     <NavBar/>
    
    {/* Section recherche  */}
      
      <Container style={{marginTop:'5em', minWidth:'950px', maxWidth:'950px', backgroundColor: '#FAFBFC',height: '100%' }}>
      <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
      <Typography className={this.classes.heading}>Head to Head</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>    

        <Grid container spacing={3}>
      <Grid item xs={12}>
      <TableHeadToHead apiKey = { this.props.apiKey }></TableHeadToHead>      </Grid>
      <Grid item xs={12}>
      <Alert severity="info">
      </Alert>

      </Grid>
      
      </Grid>

      
      </ExpansionPanelDetails>
      </ExpansionPanel>

      </Container>
    </div>
  )}
}

export default PageHeadToHead;