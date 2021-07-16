import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'
import NavBar from './NavBar';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { Alert, AlertTitle } from '@material-ui/lab';




class PageResultatRecherche extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: this.props.apiKey,
      resultat: this.props.resultat,
    }
   console.log("res dans page :" + this.state.resultat.temps);
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

retour(data) {
  this.props.callbackRetourToRecherche(data)
}

  handleCallbackViewDetails = (data) => {
    this.props.callbackViewDetails(data)
  } 

  handleCallbackViewEdit = (data) => {
    this.props.callbackViewEdit(data)
  }


  render() {
  return (
    <div className={this.classes.root}>
      <CssBaseline />
     <NavBar/>
    
    {/* Section recherche  */}
      
      <Container style={{minWidth:'950px', maxWidth:'950px', backgroundColor: '#FAFBFC',height: '100%' }}>

       <IconButton onClick={() => this.retour() } color="primary" >
        <ArrowBackIcon/>
      </IconButton >

      <Card>
      <CardContent>
     
      <div>
      { (this.state.resultat != null && this.state.resultat.correct == false) && (
      
      <Alert severity="warning">
        <AlertTitle>Recherche en échec</AlertTitle>
      <span>Nous avons rencontré un problème lors du traitement de votre recherche.</span>
      <span>Merci de vérifier vos valeurs de recherche.</span>
      <span>Besoin d'aide ? Merci de contacter : <b>support@dataturf.fr</b></span>
      
      </Alert>

  
      ) }
      </div>

      <div>
      { (this.state.resultat != null && this.state.resultat.correct == true) && (
      
        <span> Temps de la recherche : {this.state.resultat.temps} </span>
    
      ) }
      { (this.state.resultat == null) && (<center><CircularProgress disableShrink /></center>) }
      </div>

       <div>
      { (this.state.resultat != null && this.state.resultat.correct == true) && (
      
        <span> Nombre de course trouvée : {this.state.resultat.nbCourse}   + court synthese (% reussite, rendement + tablePronostic (futur course) + tableHistorique) </span>
        
      ) }
      { (this.state.resultat == null) && (<center><CircularProgress disableShrink /></center>) }
      </div>

      </CardContent>
    
    </Card>


      

      </Container>
    </div>
  )}
}

export default PageResultatRecherche;