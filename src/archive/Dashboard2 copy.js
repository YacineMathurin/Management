import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableSyntheseSelection from './TableSyntheseSelection'
import BoiteRechercheSelection from './BoiteRechercheSelection'
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import NavBar from './NavBar';
import TableHeadToHead from './TableHeadToHead';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTableSynthese : null
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
    
    {/* Section recherche  */}
      
      <Container style={{ minWidth:'950px', maxWidth:'950px', backgroundColor: '#FAFBFC',height: '100%' }}>
      <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
      <Typography className={this.classes.heading}>Filtrer les sélections</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>     
      <BoiteRechercheSelection apiKey = { this.props.apiKey } callbackFilterChange = { this.handleCallbackFilterChange }></BoiteRechercheSelection>
      </ExpansionPanelDetails>
      </ExpansionPanel>

         
    {/* Section selection  */}

      <div style={{width:'886px', marginTop:'10px'}}>
      <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={this.classes.heading}>Sélection(s) trouvée(s)</Typography>
      
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <Grid container spacing={3}>
      <Grid item xs={12}>
      <TableSyntheseSelection data = { this.state.dataTableSynthese } callbackFunctionEdit = { this.handleCallbackViewEdit } callbackFunctionDetails = { this.handleCallbackViewDetails }/>
      </Grid>
      <Grid item xs={12}>
      <Alert severity="info">Pour apparaître dans notre tableau, toutes sélections doit avoir un historique d'au moins 20 courses PMU,
      <br></br>un pourcentage de réussite d'au moins 45% et un rendement positif.
      Les gains sont calculés<br></br> pour une mise de 1€ sur les paris simple gagnant ou placé.
      </Alert>

      </Grid>
      
      </Grid>
      
      
      </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>

      </Container>
    </div>
  )}
}

export default Dashboard;