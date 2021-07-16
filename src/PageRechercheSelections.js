import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SwitchT from '@material-ui/core/Switch';
import Tab from '@material-ui/core/Tab';
import SettingsIcon from '@material-ui/icons/Settings';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import BarChartIcon from '@material-ui/icons/BarChart';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import TimelineIcon from '@material-ui/icons/Timeline';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import ReactFilterBox from "react-filter-box";
import "react-filter-box/lib/react-filter-box.css";
import NumberFormat from 'react-number-format';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import data from "./data/data";
import { rubriques } from './data/rubriques';
import TablePariHistorique from './TablePariHistorique';
import TablePronostics from './TablePronostics';
import TestBarChart from './TestBarChart';
import TestBarMensuelChart from './TestBarMensuelChart';
import TestLineChart from './TestLineChart';
import Toast from './Toast';
import * as Const from './Constant';
import { DatePicker } from "@material-ui/pickers";
import ListIcon from '@material-ui/icons/List';
import DatePickerDebut from './DatePickerDebut';
import DatePickerFin from './DatePickerFin';
import TestBarEcartChart from './TestBarEcartChart';
import TableOptimisateurTrotteur from './TableOptimiseurTrotteur';

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class PageRechercheSelections extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      apiKey: this.props.apiKey,
      dataTableSynthese : null,
      // texte affiche dans a filterbox (utiliser uniquement au debut)
      filterBoxQuery : localStorage.getItem('lastQuery') ? localStorage.getItem('lastQuery') : "", 
      // requete qu'on doit chercher - filterBoxQueryToSearch est update a chaque edit de la box (mais on force pas 
      // l'affichage sinon on a le bug : revient en fin de ligne - car ca revient a afficher un champ texte)
      filterBoxQueryToSearch: localStorage.getItem('lastQuery') ? localStorage.getItem('lastQuery') : "", 
      filterBoxQueryStatus : 'ok',
      resultat: '',
      typeChart: 1,
      typeEcart: 0,
      titleChart: "Gain / Perte par course",
      showAll: false,
      // requete a mettre en memoire, lastQuery = filterBoxQueryToSearch = filterBoxQuery quand l'utilisateur clique sur Search
      lastQuery: "",
      choixPari: localStorage.getItem('lastTypePari') ? localStorage.getItem('lastTypePari') : "SPL",
      choixOrdre: "ASC",
      openDialogSave: false,
      openDialogParametres: false,
      titleSaveSelection : "",
      descriptionSaveSelection: "",
      loading: 0,
      dateDebut: "",
      showWrongRequest: false, //if true, display le toast 'incorrect requete'
      dateDebut: "",
      dateFin: ""
    }
    
  }

  classes = makeStyles((theme: Theme) =>
  createStyles({
  }),
);

handleDialogSaveOpen = () => {
  this.setState({ openDialogSave: true })
}

handleDialogParametresOpen = () => {
  this.setState({ openDialogParametres: true })
}

handleDialogSaveClose = () => {
  this.setState({ openDialogSave: false })
}

handleDialogParametresClose = () => {
  this.setState({ openDialogParametres: false })
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

  ReactFilterBoxOnParseOk = () => { 
    //console.log('Parse Ok')
    this.setState( { filterBoxQueryStatus: 'ok' })
  }
  
  ReactFilterBoxOnChange = (query, result) => {
    // make sure the box text and query are in sync
    // la query est stockee dans filterBoxQueryToSearch 
    this.setState( { filterBoxQueryToSearch: query })
  }
  
  ReactFilterBoxOnParseError = () => {
    //console.log('Parse Error')
    this.setState( { filterBoxQueryStatus: 'error' })
  }
  showlineChart(){
    this.setState({ typeChart: 0, titleChart: "Gain / Perte cumulés" })
  }

  showBarChart(){
    this.setState({ typeChart: 1, titleChart: "Gain / Perte par course" })
  }

  showMensuelChart(){
    this.setState({ typeChart: 2, titleChart: "Réussite mensualisée" })
  }

  showEcartChart(){
    this.setState({ typeEcart: 1 })
  }

  showEcartTable(){
    this.setState({ typeEcart: 0 })
  }

    // show all races on graph or just last ones
    handleChangeShowAll = name => event => {
      console.log(this.state.showAll)
      this.setState({ showAll: event.target.checked })
    }
    
    handleTextFieldTitle = (e) => {
      this.setState({ titleSaveSelection: e.target.value })
    }
    
    handleTextFieldDescription = (e) => {
      this.setState({ descriptionSaveSelection: e.target.value })
    }

    handleRadio = (e) => {
      this.setState({ choixPari: e.currentTarget.value })
    }

    handleRadioOrdre = (e) => {
      this.setState({ choixOrdre: e.currentTarget.value })
    }

    handleDate = (e) => {
      alert("hello date Picker")
    }
 
    
    handleCallSave = () => {
      this.callSaveWS();
    }

    handleDateDebut = (e) => {
      this.setState({ dateDebut: e })
    }

    handleDateFin = (e) => {
      this.setState({ dateFin: e })
    }

  

 callSaveWS(){
   var reussite = 0;
   var rendement = 0;
   var gain = 0;
   var title = "";
   var description = "";
   var requete = "";
   var pari = "";
   var eng = "";
   //this.callRechercheWS();
   
   // actualisation de la recherche pour etre sur 
   // de mapper la requete avec son bilan
   
   if(this.state.resultat.detail != null){
     reussite = this.state.resultat.detail.reussite;
     rendement = this.state.resultat.detail.rde;
     gain = this.state.resultat.detail.solde;
   

     title = this.state.titleSaveSelection;
     description = this.state.descriptionSaveSelection;
     requete = this.state.filterBoxQuery;
     pari = this.state.choixPari;
     eng = this.state.resultat.detail.pronostics.length;
   }
   if(requete != "" && reussite != 0){

   fetch(Const.URL_WS_SAVE_DOSSIER + `?token=${this.state.apiKey}&ACTION=SAVE&REQUETE=${requete}&LABEL=${title}&DESCRIPTION=${description}&REUSSITE=${reussite}&RENDEMENT=${rendement}&GAIN=${gain}&PARI=${pari}&ENG=${eng}`, { retry: 3, retryDelay: 1000 })
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
  }
 }

  callRechercheWS(){

    this.setState({ loading: 1});

    var debut = "01/01/2018";
    var fin = "";
    if(this.state.dateDebut != ""){
      debut = this.state.dateDebut.toLocaleDateString("fr-FR");
    }
    if(this.state.dateFin != ""){
      fin = this.state.dateFin.toLocaleDateString("fr-FR");
    }
    
    var requete = new Object();
    requete.DTF = this.state.filterBoxQueryToSearch.split("%").join("");

    requete = JSON.stringify(requete);

    fetch(Const.URL_WS_RECHERCHE + `?token=${this.state.apiKey}&requete=${requete}&PARI=${this.state.choixPari}&debut=${debut}&fin=${fin}&ordre=${this.state.choixOrdre}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
      this.setState({ resultat: data});
      localStorage.setItem("lastQuery", this.state.filterBoxQueryToSearch);
      this.setState({ loading: 0});
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })

  }

  getSearchBoxQuery = () => {
    if (this.state.filterBoxQueryStatus == 'error') {
      this.setState({ showWrongRequest: true })
    }
    else {
      this.callRechercheWS();
    }
  }
  

  render() {
  return (
    <div className={this.classes.root}>
    { (this.state.showWrongRequest) && (<Toast severity= 'error' message= 'Requête erronée' callback = { () => this.setState({ showWrongRequest: false }) }></Toast>) }
    {/* DIALOG SAVE */}
    <Dialog
      //fullWidth='false'
      minWidth='800px'
      maxWidth='800px'
      width='800px'
      open={this.state.openDialogSave}
      onClose={this.handleDialogSaveClose}
      >
      <div>
      <DialogTitle><span style={{color:"#777777"}}>Enregistrer la sélection</span>
      </DialogTitle>
      <DialogContent dividers>
      <DialogContentText>
        <Grid container>
          <Grid item xs={12}>
          <TextField value={this.state.titleSaveSelection}  onChange={this.handleTextFieldTitle} fullWidth id="outlined-basic" label="Nom de votre sélection" variant="outlined" />
          </Grid>
          <Grid style={{marginTop:"1em"}} item xs={12}>
          <TextField
          value={this.state.descriptionSaveSelection}
          onChange={this.handleTextFieldDescription}
          fullWidth
          id="filled-multiline-static"
          label="Une courte description"
          multiline
          rows={4}
          defaultValue=""
          variant="outlined"
        />
        </Grid>
        </Grid>
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={this.handleDialogSaveClose} color="primary" autoFocus>Fermer</Button>
      <Button onClick={this.handleCallSave} variant="contained"  color="primary" autoFocus>Enregistrer</Button>
      </DialogActions> </div>
      </Dialog>

      {/* DIALOG PARAMETRES */}
    <Dialog
      //fullWidth='false'
      minWidth='500px'
      maxWidth='500px'
      width='500px'
      open={this.state.openDialogParametres}
      onClose={this.handleDialogParametresClose}
      >
      <div>
      <DialogTitle><span style={{color:"#777777"}}>Paramètres</span>
      </DialogTitle>
      <DialogContent dividers>
      <DialogContentText>
          <Typography color="textSecondary" gutterBottom variant="body1" style={{color:"#454E54", lineHeight:"0.5em"}}>Ex aequo :</Typography>
          <Typography color="textSecondary" style={{marginTop:"1em"}}gutterBottom variant="body1">Dans le cas où plusieurs trotteurs sont sélectionnés pour une même course.</Typography>
          <Typography color="textSecondary" gutterBottom variant="body1">Retenir le trotteur ayant :</Typography>
        
        
            <RadioGroup row aria-label="pos" name="pos" onChange={this.handleRadioOrdre} defaultValue={ this.state.choixOrdre } >
              <FormControlLabel value="ASC" control={<Radio color="primary" />} label="Le plus petit numéro" />
              <FormControlLabel value="DESC" control={<Radio color="primary" />} label="Le plus grand numéro" />
            </RadioGroup>
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={this.handleDialogParametresClose} variant="contained" color="primary" autoFocus>Fermer</Button>
      </DialogActions> </div>
      </Dialog>

      <CssBaseline />
    {/* Section recherche  */}
      
      <Container style={{ minWidth:'950px', maxWidth:'950px', backgroundColor: '#FAFBFC',height: '100%' }}>
      
    <Card style={{marginBottom:"1em"}}>
    <CardContent>
    <Typography color="textSecondary" gutterBottom variant="h5" style={{color:"#454E54", lineHeight:"0.5em"}}>Éditeur</Typography>
    <Typography color="textSecondary" gutterBottom variant="body1">Construisez vos sélections de jeu</Typography>
       
        <Grid spacing={2} style={{marginTop:"1.5em"}} container>
          <Grid item xs={6}>
          <DatePickerDebut callbackHandleDateDebut={this.handleDateDebut}/>
          </Grid>
          <Grid item xs={6}>
          <DatePickerFin callbackHandleDateFin={this.handleDateFin}/>
          </Grid>


          <Grid item xs={12}>
         
            <ReactFilterBox className={this.classes.title}
              query={ this.state.filterBoxQuery.toString() }
              data={ data } 
              options={ rubriques }
              onParseOk={() => { this.ReactFilterBoxOnParseOk() }}
              // on change : a chaque edit > update 
              onChange={(query, result) => { this.ReactFilterBoxOnChange(query, result) }}
              onParseError={() => { this.ReactFilterBoxOnParseError() }}
              />
            
          </Grid>
          <Grid item xs={8}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Choisissez le type de jeu :</FormLabel>
            <RadioGroup row aria-label="position" name="position" onChange={this.handleRadio} defaultValue={ this.state.choixPari } >
              <FormControlLabel value="SG" control={<Radio color="primary" />} label="Simple Gagnant" />
              <FormControlLabel default value="SPL" control={<Radio color="primary" />} label="Simple Placé" />
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={4} style={{marginTop:'1em'}}>
          <Tooltip arrow title={<h3>Lancer la recherche</h3>}>
            <Fab onClick={() => { this.getSearchBoxQuery() }} style={{float:'right',marginBottom:'1em', marginLeft:'1em'}} color="primary" aria-label="Search">
              <SearchIcon />
            </Fab>
            </Tooltip>
           
            <Tooltip arrow title={<h3>Enregistrer la sélection dans mon dossier</h3>}>
            <Fab onClick={() => { this.handleDialogSaveOpen() }} style={{float:'right',marginBottom:'1em', marginLeft:'1em'}} color="primary" aria-label="Search">
              <SaveIcon />
            </Fab>
            </Tooltip>

            <Tooltip arrow title={<h3>Paramètres</h3>}>
            <Fab onClick={() => { this.handleDialogParametresOpen() }} style={{float:'right',marginBottom:'1em', marginLeft:'1em'}} color="primary" aria-label="Search">
              <SettingsIcon />
            </Fab>
            </Tooltip>

            <Tooltip arrow title={<h3>Efface la zone d'édition</h3>}>
            <Fab  onClick={() => { localStorage.removeItem('lastQuery'); this.setState( { filterBoxQuery: '' }) }} style={{float:'right',marginBottom:'1em', marginLeft:'0em'}} color="secondary" aria-label="Search">
              <ClearIcon />
            </Fab>
            </Tooltip>
          </Grid>
        </Grid>
     </CardContent>
     </Card>

    {/* BLOC LOADING */}
    { (this.state.resultat != null && this.state.loading == 1) && (
      <center><CircularProgress disableShrink /></center>
    )}
    
    {/* RESULTAT DE LA RECHERCHE VIDE  */}
    { (this.state.resultat != null && this.state.resultat.correct == true && this.state.resultat.detail == null && this.state.loading == 0) && (
      <Alert severity="info">
        <AlertTitle>Aucun résultat trouvé</AlertTitle>
          <span>La recherche n'a retournée aucun résultat.</span>
      </Alert>
    )}

    {/* ERREUR LORS DE LA RECHERCHE  */}
    { (this.state.resultat != null && this.state.resultat.correct == false && this.state.loading == 0) && (
      <Alert severity="warning">
        <AlertTitle>Recherche en échec</AlertTitle>
          <span>Nous avons rencontré un problème lors du traitement de votre recherche.</span>
          <span>Merci de vérifier vos valeurs de recherche.</span>
          <span>Besoin d'aide ? Merci de contacter : <b>support@dataturf.fr</b></span>
      </Alert>
    )}

    {/* BLOC RESULTAT */}

    { (this.state.resultat.detail != null  && this.state.resultat.correct == true && this.state.loading == 0) && (
      <Grid container>
        <Grid item xs={6}>
          <Card style={{marginRight:'0.5em'}}>
            <CardContent>
              <Typography className={this.classes.title} color="textSecondary" gutterBottom>
                Informations sur les courses
              </Typography>
              
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                      <TableCell align="left">Période analysée</TableCell>
                      <TableCell align="right">{this.state.resultat.detail.periode}</TableCell>    
                  </TableRow>
                  <TableRow>
                      <TableCell align="left">Nombre de jours retenus</TableCell>
                      <TableCell align="right"><NumberFormat value={this.state.resultat.detail.jour} displayType={'text'} thousandSeparator=' '/> </TableCell>   
                  </TableRow>
                  <TableRow>
                      <TableCell align="left">Nombre de courses jouées</TableCell>
                      <TableCell align="right"><NumberFormat value={this.state.resultat.detail.ticket} displayType={'text'} thousandSeparator=' '/> </TableCell>    
                  </TableRow>
                  <TableRow>
                      <TableCell align="left">Dynamique de jeu</TableCell>
                      { (this.state.resultat.detail.dynamique != null) && (
                      <TableCell align="right">{this.state.resultat.detail.dynamique.toString().replace(".",",")}</TableCell>  )}    
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6}>
          <Card style={{marginLeft:'0.5em'}}>
            <CardContent>
              <Typography className={this.classes.title} color="textSecondary" gutterBottom>
                Bilan des performances
              </Typography>

              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell align="left">Type de pari</TableCell>
                    { (this.state.resultat.detail.type != null && this.state.resultat.detail.type == "SPL") && (
                    <TableCell align="right">Simple Placé</TableCell>)}
                    { (this.state.resultat.detail.type != null && this.state.resultat.detail.type == "SG") && (
                    <TableCell align="right">Simple Gagnant</TableCell>)}
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Réussite</TableCell>
                    {(this.state.resultat.detail.reussite >= 0) && (this.state.resultat.detail.reussite < 30) && (
                      <TableCell align="right" style={{color:"#D50000"}}>{this.state.resultat.detail.reussite.toString().replace(".",",")} %</TableCell>
                    )}
                    {(this.state.resultat.detail.reussite >= 30) && (this.state.resultat.detail.reussite < 60) && (
                      <TableCell align="right" style={{color:"#FF9200"}}>{this.state.resultat.detail.reussite.toString().replace(".",",")} %</TableCell>
                    )}
                    {(this.state.resultat.detail.reussite >= 60) && (
                      <TableCell align="right" style={{color:"#1AA001"}}>{this.state.resultat.detail.reussite.toString().replace(".",",")} %</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Rendement</TableCell>
                    {(this.state.resultat.detail.rde > 0) && (
                      <TableCell align="right" style={{color:"#1AA001"}}>{this.state.resultat.detail.rde.toString().replace(".",",")} %</TableCell>
                    )}
                    {(this.state.resultat.detail.rde < 0) && (
                      <TableCell align="right" style={{color:"#D50000"}}>{this.state.resultat.detail.rde.toString().replace(".",",")} %</TableCell>
                    )}   
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Gain / Perte</TableCell>
                    {(this.state.resultat.detail.solde > 0) && (
                      <TableCell align="right" style={{color:"#1AA001"}}>{this.state.resultat.detail.solde.toString().replace(".",",")} €</TableCell>
                    )}
                    {(this.state.resultat.detail.solde < 0) && (
                      <TableCell align="right" style={{color:"#D50000"}}>{this.state.resultat.detail.solde.toString().replace(".",",")} €</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} style={{marginTop:'1em'}}>
          <Card style={{width:'100%'}}>
            <CardContent>
              <Typography className={this.classes.title} color="textSecondary" gutterBottom>
                {this.state.titleChart}
                <div style={{float:"right"}}>
                <Tooltip arrow title={<h3>Afficher les gains / pertes cumulés</h3>}>
                  <IconButton onClick={() => {this.showlineChart()}} color="primary" component="span">
                    <TimelineIcon />
                  </IconButton>
                  </Tooltip>
                  <Tooltip arrow title={<h3>Afficher les gains / pertes par course</h3>}>
                  <IconButton onClick={() => {this.showBarChart()}} color="primary" component="span">
                    <BarChartIcon />
                  </IconButton>
                  </Tooltip>
                  <Tooltip arrow title={<h3>Afficher les gains / pertes par mois</h3>}>
                  <IconButton onClick={() => {this.showMensuelChart()}} color="primary" component="span">
                    <BarChartIcon />
                  </IconButton>
                  </Tooltip>
                </div>
              </Typography>
              <div style={{marginTop:'1.5em'}}>
                
                {/* BAR CHART MENSUEL */}
                { (this.state.typeChart == 2) && (this.state.resultat.detail.ligneHisto != null ) && (!this.state.showAll) && (<TestBarMensuelChart data = { this.state.resultat.detail.ventilationMensuelle } />)}
                {/* we have data and last races */}
                { (this.state.typeChart == 2) && (this.state.resultat.detail.ligneHisto != null ) && (this.state.showAll) && (<TestBarMensuelChart data = { this.state.resultat.detail.ventilationMensuelle.slice(this.state.resultat.detail.ventilationMensuelle.length-20, this.state.resultat.detail.ventilationMensuelle.length) } style={{marginTop:'10em'}}/>)}
                
                {/* BAR CHART */}
                { (this.state.typeChart == 1) && (this.state.resultat.detail.ligneHisto != null ) && (!this.state.showAll) && (<TestBarChart data = { this.state.resultat.detail.ligneHisto } />)}
                {/* we have data and last races */}
                { (this.state.typeChart == 1) && (this.state.resultat.detail.ligneHisto != null ) && (this.state.showAll) && (<TestBarChart data = { this.state.resultat.detail.ligneHisto.slice(this.state.resultat.detail.ligneHisto.length-20, this.state.resultat.detail.ligneHisto.length) } style={{marginTop:'10em'}}/>)}

                {/* LINE CHART*/}
                { (this.state.typeChart == 0) && (this.state.resultat.detail.ligneHisto != null ) && (!this.state.showAll) && (<TestLineChart data = { this.state.resultat.detail.ligneHisto } />)}
                {/* we have data and last races */}
                { (this.state.typeChart == 0) && (this.state.resultat.detail.ligneHisto != null ) && (this.state.showAll) && (<TestLineChart data = { this.state.resultat.detail.ligneHisto.slice(this.state.resultat.detail.ligneHisto.length-20, this.state.resultat.detail.ligneHisto.length) } style={{marginTop:'10em'}}/>)}
              </div>
              <FormGroup row >
                <FormControlLabel
                  control={ <SwitchT checked={ this.state.showAll } onChange={ this.handleChangeShowAll('showAll') } value = 'showAll'/> }
                  label="Afficher les 20 dernières données"
                  />
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} style={{marginTop:'1em'}}>
          <Card style={{marginRight:'0.5em'}}>
            <CardContent>
              <Typography className={this.classes.title} color="textSecondary" gutterBottom>
                Informations sur les écarts
                <div style={{float:"right"}}>
                <Tooltip arrow title={<h3>Afficher le tableau des écarts</h3>}>
                <IconButton onClick={() => {this.showEcartTable()}} color="primary" component="span">
                    <ListIcon />
                  </IconButton>
                  </Tooltip>
                  <Tooltip arrow title={<h3>Afficher la distribution des écarts</h3>}>
                  <IconButton onClick={() => {this.showEcartChart()}} color="primary" component="span">
                    <BarChartIcon />
                  </IconButton>
                  </Tooltip>
                </div>
              </Typography>
              { (this.state.typeEcart == 0 ) && (this.state.resultat.detail.ligneHisto != null )  && (
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                      <TableCell align="left">Suite actuelle de course perdante</TableCell>
                      <TableCell align="right" style={{color:"#D50000"}}>{this.state.resultat.detail.suitePerdante}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell align="left">Suite maximun rencontrée</TableCell>
                      <TableCell align="right" style={{color:"#D50000"}}>{this.state.resultat.detail.suitePerdanteMax}</TableCell>    
                  </TableRow>
                  <TableRow>
                      <TableCell align="left">Suite actuelle de course gagnante</TableCell>
                      <TableCell align="right" style={{color:"#1AA001"}}>{this.state.resultat.detail.suiteGagnant}</TableCell>    
                  </TableRow>
                  <TableRow>
                      <TableCell align="left">Suite maximun rencontrée</TableCell>
                      <TableCell align="right" style={{color:"#1AA001"}}>{this.state.resultat.detail.suiteGagnantMax}</TableCell>    
                  </TableRow>
                </TableBody>
              </Table>)}

              { (this.state.typeEcart == 1) && (this.state.resultat.detail.ligneHisto != null )  && (
                  <TestBarEcartChart label="Distribution des écarts perdants" data = { this.state.resultat.detail.distribEcartP.nombres } />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} style={{marginTop:'1em'}}>
          <Card style={{marginLeft:'0.5em', height:"300px"}}>
            <CardContent>
              <Typography className={this.classes.title} color="textSecondary" gutterBottom>
                  Informations sur les rapports
              </Typography>

            <Table style={{width:'100%', marginTop:"23px"}} aria-label="simple table">
              <TableBody>
                <TableRow>
                    <TableCell align="left">Rapport minimum</TableCell>
                    { (this.state.resultat.detail.rapportMin != null) && (
                    <TableCell align="right">{this.state.resultat.detail.rapportMin.toString().replace(".",",")} €</TableCell>  )}
                </TableRow>
                <TableRow>
                    <TableCell align="left">Rapport maximum</TableCell>
                    { (this.state.resultat.detail.rapportMax != null) && (
                    <TableCell align="right">{this.state.resultat.detail.rapportMax.toString().replace(".",",")} €</TableCell>  )}
                </TableRow>
                <TableRow>
                    <TableCell align="left">Rapport moyen</TableCell>
                    { (this.state.resultat.detail.rapportMoy != null) && (
                    <TableCell align="right">{this.state.resultat.detail.rapportMoy.toString().replace(".",",")} €</TableCell>  )}
                </TableRow>
                <TableRow>
                    <TableCell align="left">Pourcentage de favori</TableCell>
                    { (this.state.resultat.detail.favori != null) && (
                    <TableCell align="right">{this.state.resultat.detail.favori.toString().replace(".",",")} %</TableCell>  )}
                </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} style={{marginTop:'1em'}}>
          <BrowserRouter>
            <AppBar position="static">
              <Tabs 
              // onChange={handleChange}
              value={0}
              indicatorColor="primary"
              textColor="white"
              centered
              >
                <Tab label="Pronostics" component= { Link } to= '/pronostics' />
                <Tab label="Historique des paris" component= { Link } to= '/historique' />
                <Tab label="Optimiseur" component= { Link } to= '/optimisateur' />
              </Tabs>
            </AppBar>
            <Switch>
              <Route path='/optimisateur'>
                {/* if the critere array is null (time to load the data) then display the spinning wheel */}
                { (this.state.resultat.detail.pronostics != null) && (
                  <Card>
                    <Alert style={{margin:"1em"}} severity="info">L'optimiseur détaille la performance de chaque trotteurs rencontrés par la sélection de jeu.</Alert>
                      <TableOptimisateurTrotteur optimisation={this.state.resultat.detail.optimiseurTrotteur}/> 
                   </Card> 
                      
                  ) }
                { (this.state.resultat.detail.pronostics == null) && (<center><CircularProgress disableShrink /></center>) }
              </Route>
              <Route path='/historique'>
                {/* if the critere array is null (time to load the data) then display the spinning wheel */}
                { (this.state.resultat.detail.ligneHisto != null) && (
                <Card>
                <Alert style={{margin:"1em"}} severity="info">Ce tableau contient les 100 derniers paris de la sélection.</Alert>
                <TablePariHistorique histo={(this.state.resultat.detail.ligneHisto)}/>
                </Card>
                ) }
                { (this.state.resultat.detail.ligneHisto == null) && (<center><CircularProgress disableShrink /></center>) }
              </Route>
              <Route path='/pronostics'>
                {/* if the critere array is null (time to load the data) then display the spinning wheel */}
                { (this.state.resultat.detail.pronostics != null) && (
                <Card>
                <Alert style={{margin:"1em"}} severity="info">Ce tableau contient les trotteurs répondant aux critères de la sélection (Pronostics du jour / du lendemain).</Alert>
                <TablePronostics pronostics={this.state.resultat.detail.pronostics} isDL={true} isPagination={true}/>
                </Card>
                ) }
                { (this.state.resultat.detail.pronostics == null) && (<center><CircularProgress disableShrink /></center>) }
              </Route>
            </Switch>
          </BrowserRouter>
        </Grid>
      </Grid> 
    )}
  </Container>
</div>
)}
}

export default PageRechercheSelections;