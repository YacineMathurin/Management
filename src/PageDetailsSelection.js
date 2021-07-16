import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SwitchT from '@material-ui/core/Switch';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BarChartIcon from '@material-ui/icons/BarChart';
import EditIcon from '@material-ui/icons/Edit';
import TimelineIcon from '@material-ui/icons/Timeline';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import TablePariHistorique from './TablePariHistorique';
import TablePronostics from './TablePronostics';
import TestBarChart from './TestBarChart';
import TestLineChart from './TestLineChart';
import Tooltip from '@material-ui/core/Tooltip';
import NumberFormat from 'react-number-format';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import * as Const from './Constant';

const drawerWidth = 240;
const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class PageDetailsSelection extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: null,
        apiKey: this.props.apiKey,
        detail: "",
        typeChart: 1,
        titleChart: "Gain / Perte par course",
        showAll: false
      }

      fetch(Const.URL_WS_DETAIL + `?token=${this.state.apiKey}&id=${this.props.showDetailsSelection}`, { retry: 3, retryDelay: 1000 })
      .then(res => res.json())
      .then((data) => {
        if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
          this.props.callbackNeedToLogin()
        } else {
        console.log("donnee " + this.state.detail.requete)
        this.setState({ detail: data }) 
        }
      })
      .catch(console.log)    
    }
  

  classes = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
  }),
  );

  retour(data, typePari) {
    // return data = null to go back to selection
    // if not null >> go to edit selection (in this case data = requete to edit)
    localStorage.setItem("lastQuery", data);
    localStorage.setItem("lastTypePari", typePari);
    this.props.callbackRetourDetails(data)
  }
  

  showlineChart(){
    this.setState({ typeChart: 0, titleChart: "Gain / Perte cumulés" })
  }

  showBarChart(){
    this.setState({ typeChart: 1, titleChart: "Gain / Perte par course" })
  }

  // show all races on graph or just last ones
  handleChangeShowAll = name => event => {
    this.setState({ showAll: event.target.checked })
  }

  render() {
  return (
  <div className={this.classes.root}>
      <CssBaseline />

      <Container style={{ minWidth:'950px', maxWidth:'950px', backgroundColor: '#FAFBFC',height: '100%' }}>

      {/* Section bouton retour */}
      <IconButton onClick={() => this.retour(null, null) } color="primary" >
        <ArrowBackIosIcon/> <span color="textSecondary"  style={{color:"#454E54", marginLeft:"0.2em",  fontSize:"1.3rem" }}>Fiche Performance</span>
      </IconButton >
      
      {/* Section display critere */}

      <div style={{width:'900px', marginTop:"0.5em"}}>
        <Card style={{width:'100%'}}>
          <CardContent>
            <Typography className={this.classes.title} color="textSecondary" gutterBottom>
              Les critères de la sélection
              
              <div style={{float:"right"}}>
              { (this.state.detail.critere != null) && ( 
              <Tooltip arrow title={<h3>Éditer la sélection.</h3>}>
              <IconButton onClick={() => this.retour(this.state.detail.requete, this.state.detail.type) } color="primary" >
              <EditIcon fontSize="small" éditer la sélection/>
              </IconButton ></Tooltip> )
              }
              { (this.state.detail.critere == null) && (<center><CircularProgress disableShrink /></center>) }
              </div>

            </Typography>
            {/* { this.state.detail.critere } */}
            <div style={{marginTop:"1em"}}>
              {/* if the critere array is null (time to load the data) then display the spinning wheel */}
              { (this.state.detail.critere != null) && ( 
                  this.state.detail.critere.map((value) =>
                  <Chip label={value.critere} color="primary" style={{marginRight:"0.5em", marginBottom:"0.5em"}} /> ))
              }
              
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section display info courses */} 

        <div style={{width:'900px'}}>
        <div style={{float:'left', marginTop:'1em', width:'49%'}}>
        <Card style={{width:'100%'}}>
      <CardContent>
      <Typography className={this.classes.title} color="textSecondary" gutterBottom>
          Informations sur les courses
        </Typography>
         
           <Table style={{width:'100%'}} aria-label="simple table">
        
        <TableBody>
          <TableRow>
              <TableCell align="left">Période analysée</TableCell>
              <TableCell align="right">{this.state.detail.periode}</TableCell>    
          </TableRow>
          <TableRow>
              <TableCell align="left">Nombre de jours retenus</TableCell>
              <TableCell align="right"><NumberFormat value={this.state.detail.jour} displayType={'text'} thousandSeparator=' '/></TableCell>    
          </TableRow>
          <TableRow>
              <TableCell align="left">Nombre de courses jouées</TableCell>
              <TableCell align="right"><NumberFormat value={this.state.detail.ticket} displayType={'text'} thousandSeparator=' '/></TableCell>    
          </TableRow>
          <TableRow>
              <TableCell align="left">Dynamique de jeu</TableCell>
              { (this.state.detail.dynamique != null) && (
              <TableCell align="right">{this.state.detail.dynamique.toString().replace(".",",")}</TableCell>  )}    
          </TableRow>
          </TableBody>
      </Table>

      </CardContent>
      
    </Card>
        </div>

      {/* Section Bilan  */}

        <div style={{float:'right',marginTop:'1em', width:'49%'}}>
        <Card style={{witdh:'100%'}}>
      <CardContent>
      <Typography className={this.classes.title} color="textSecondary" gutterBottom>
          Bilan des performances
        </Typography>

          <Table style={{width:'100%'}} aria-label="simple table">
        
        <TableBody>
          <TableRow>
              <TableCell align="left">Type de pari</TableCell>
              {(this.state.detail.type == "SPL") && (
                <TableCell align="right">Simple placé</TableCell>
              )} 
              {(this.state.detail.type == "SG") && (
                <TableCell align="right">Simple gagnant</TableCell>
              )} 

          </TableRow>
          <TableRow>
              <TableCell align="left">Réussite</TableCell>
              {(this.state.detail.reussite >= 0) && (this.state.detail.reussite < 30) && (
                <TableCell align="right" style={{color:"#D50000"}}>{this.state.detail.reussite.toString().replace(".",",")} %</TableCell>
              )}
              {(this.state.detail.reussite >= 30) && (this.state.detail.reussite < 60) && (
                <TableCell align="right" style={{color:"#FF9200"}}>{this.state.detail.reussite.toString().replace(".",",")} %</TableCell>
              )}
              {(this.state.detail.reussite >= 60) && (
                <TableCell align="right" style={{color:"#1AA001"}}>{this.state.detail.reussite.toString().replace(".",",")} %</TableCell>
              )}

          </TableRow>
          <TableRow>
              <TableCell align="left">Rendement</TableCell>
              {(this.state.detail.rde > 0) && (
                <TableCell align="right" style={{color:"#1AA001"}}>{this.state.detail.rde.toString().replace(".",",")} %</TableCell>
              )}
              {(this.state.detail.rde < 0) && (
                <TableCell align="right" style={{color:"#D50000"}}>{this.state.detail.rde.toString().replace(".",",")} %</TableCell>
              )}   

          </TableRow>
          <TableRow>
              <TableCell align="left">Gain / Perte</TableCell>
              {(this.state.detail.solde > 0) && (
                <TableCell align="right" style={{color:"#1AA001"}}>{this.state.detail.solde.toString().replace(".",",")} €</TableCell>
              )}
              {(this.state.detail.solde < 0) && (
                <TableCell align="right" style={{color:"#D50000"}}>{this.state.detail.solde.toString().replace(".",",")} €</TableCell>
              )}
                  
          </TableRow>
          </TableBody>
      </Table>

      </CardContent>
      
    </Card>
        </div>
        
        </div>

      {/* Section Graph  */}

      <div style={{width:'900px', marginTop:'22em'}}>

          <Card style={{width:'100%'}}>
      <CardContent>
      <Typography className={this.classes.title} color="textSecondary" gutterBottom>
                {this.state.titleChart}
                <div style={{float:"right"}}>
      <Tooltip arrow title={<h3>Afficher le graphique des gains cumulés.</h3>}>
      <IconButton onClick={() => {this.showlineChart()}} color="primary" component="span">
          <TimelineIcon />
      </IconButton>
      </Tooltip>
      <Tooltip arrow title={<h3>Afficher le graphique des gains par course.</h3>}>
      <IconButton onClick={() => {this.showBarChart()}} color="primary" component="span">
          <BarChartIcon />
      </IconButton>
      </Tooltip>
      </div>
      </Typography>
     <div style={{marginTop:'1.5em'}}>
        {/* BAR CHART */}
        { (this.state.typeChart == 1) && (this.state.detail.ligneHisto != null ) && (!this.state.showAll) && (<TestBarChart data = { this.state.detail.ligneHisto } />)}
        {/* we have data and last races */}
        { (this.state.typeChart == 1) && (this.state.detail.ligneHisto != null ) && (this.state.showAll) && (<TestBarChart data = { this.state.detail.ligneHisto.slice(this.state.detail.ligneHisto.length-20, this.state.detail.ligneHisto.length) } style={{marginTop:'10em'}}/>)}
        
        {/* LINE CHART*/}
        { (this.state.typeChart == 0) && (this.state.detail.ligneHisto != null ) && (!this.state.showAll) && (<TestLineChart data = { this.state.detail.ligneHisto } />)}
        {/* we have data and last races */}
        { (this.state.typeChart == 0) && (this.state.detail.ligneHisto != null ) && (this.state.showAll) && (<TestLineChart data = { this.state.detail.ligneHisto.slice(this.state.detail.ligneHisto.length-20, this.state.detail.ligneHisto.length) } style={{marginTop:'10em'}}/>)}
        </div>
        <FormGroup row >
      <FormControlLabel
        control={ <SwitchT checked={ this.state.showAll } onChange={ this.handleChangeShowAll('showAll') } value = 'showAll'/> }
        label="Afficher les 20 derniers paris"
      />
      </FormGroup>
     
      </CardContent>
      
    </Card>

        
        </div>

 <div style={{width:'900px'}}>
        <div style={{float:'left', marginTop:'1em', width:'49%'}}>
        <Card style={{width:'100%'}}>
      <CardContent>
      <Typography className={this.classes.title} color="textSecondary" gutterBottom>
          Informations sur les écarts
        </Typography>

           <Table style={{width:'100%'}} aria-label="simple table">
        
        <TableBody>
          <TableRow>
              <TableCell align="left">Suite actuelle de course perdante</TableCell>
              <TableCell align="right" style={{color:"#D50000"}}>{this.state.detail.suitePerdante}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell align="left">Suite maximun rencontrée</TableCell>
              <TableCell align="right" style={{color:"#D50000"}}>{this.state.detail.suitePerdanteMax}</TableCell>    
          </TableRow>
          <TableRow>
              <TableCell align="left">Suite actuelle de course gagnante</TableCell>
              <TableCell align="right" style={{color:"#1AA001"}}>{this.state.detail.suiteGagnant}</TableCell>    
          </TableRow>
          <TableRow>
              <TableCell align="left">Suite maximun rencontrée</TableCell>
              <TableCell align="right" style={{color:"#1AA001"}}>{this.state.detail.suiteGagnantMax}</TableCell>    
          </TableRow>
          </TableBody>
      </Table>

      </CardContent>
      
    </Card>
        </div>

      {/* Section Bilan  */}

        <div style={{float:'right',marginTop:'1em', marginBottom:'1em', width:'49%'}}>
        <Card style={{witdh:'100%'}}>
      <CardContent>
      <Typography className={this.classes.title} color="textSecondary" gutterBottom>
          Informations sur les rapports
        </Typography>

          <Table style={{width:'100%'}} aria-label="simple table">
        
        <TableBody>
          <TableRow>
              <TableCell align="left">Rapport minimum</TableCell>
              { (this.state.detail.rapportMin != null) && (
              <TableCell align="right">{this.state.detail.rapportMin.toString().replace(".",",")} €</TableCell>  )}
          </TableRow>
          <TableRow>
              <TableCell align="left">Rapport maximum</TableCell>
              { (this.state.detail.rapportMax != null) && (
              <TableCell align="right">{this.state.detail.rapportMax.toString().replace(".",",")} €</TableCell>  )}
          </TableRow>
          <TableRow>
              <TableCell align="left">Rapport moyen</TableCell>
              { (this.state.detail.rapportMoy != null) && (
              <TableCell align="right">{this.state.detail.rapportMoy.toString().replace(".",",")} €</TableCell>  )}
          </TableRow>
          <TableRow>
              <TableCell align="left">Pourcentage de favori</TableCell>
              { (this.state.detail.favori != null) && (
              <TableCell align="right">{this.state.detail.favori.toString().replace(".",",")} %</TableCell>  )}
          </TableRow>
          </TableBody>
      </Table>

      </CardContent>
      
    </Card>
        </div>
        
        </div>


<div style={{width:'900px'}}>
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


</Tabs>
</AppBar>
<Switch>
<Route path='/historique'>
{/* if the critere array is null (time to load the data) then display the spinning wheel */}
      { (this.state.detail.ligneHisto != null) && (
       <TablePariHistorique histo={(this.state.detail.ligneHisto)} />) }
      { (this.state.detail.ligneHisto == null) && (<center><CircularProgress disableShrink /></center>) }

  
</Route>

<Route path='/pronostics'>
{/* if the critere array is null (time to load the data) then display the spinning wheel */}
      { (this.state.detail.pronostics != null) && (
       <TablePronostics pronostics={this.state.detail.pronostics} isDL={true} isPagination={true} /> ) }
      { (this.state.detail.pronostics == null) && (<center><CircularProgress disableShrink /></center>) }
</Route>

</Switch>
</BrowserRouter>
</div>

{/* Section bouton retour */}

      <IconButton style={{marginTop:"0.3em"}} onClick={() => this.retour(null, null) } color="primary" >
        <ArrowBackIcon/>
      </IconButton >
      </Container>
    </div>
  );
}
}

export default PageDetailsSelection;