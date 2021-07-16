import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DatePickerPronostics from './DatePickerPronostics';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableBibliotheque from './TableBibliotheque';
import * as Const from './Constant';
import TableSynthese from './TableSynthese';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CardHeader from '@material-ui/core/CardHeader';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ChronoBarChart from './ChronoBarChart';
import DatePickerDebut from './DatePickerDebut';
import DatePickerFin from './DatePickerFin';

class PageTopChrono extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: this.props.apiKey,
      progress: "n",
      hippodromeSelected: "",
    }
    this.handleCourseChange = this.handleCourseChange.bind(this);
   
  }

  classes = makeStyles((theme: Theme) =>
  createStyles({
   }),
  );

  handleCallRetourDetails = (requete) => {
    
  } 

  callbackToRecherche = (date, data) => {
    this.props.callbackToRecherche(date, data)
  } 

  handleCallbackViewEdit = (data) => {
    this.props.callbackViewEdit(data)
  }

  handleCallbackFilterChange = (data) => {
    this.setState( { dataTableSynthese: data })
  }

  handleCourseChange= (event) => {
    this.setState({ courseSelection: event.target.value })
  }

  handleMotCle= (event) => {
    this.setState({ motCle: event.target.value })
  }

  handleChronoChange= (event) => {
    this.setState({ chronoSelected: event.target.value })
  }

  handleParametreChange= (event) => {
    this.setState({ parametreSelected: event.target.value })
  }

  handleHippodromeChange = (event) => {
    this.setState({ hippodromeSelected: event.target.value })
  }

  handleDistanceChange= (event) => {
    this.setState({ distanceSelected: event.target.value })
  }

  handleCategorieChange= (event) => {
    this.setState({ categorieSelected: event.target.value })
  }

  handleDepartChange= (event) => {
    this.setState({ departSelected: event.target.value })

  }

  handleAgeChange= (event) => {
    this.setState({ ageSelected: event.target.value })
  }

  handleSexeChange= (event) => {
    this.setState({ sexeSelected: event.target.value })

  }

  handleDefChange= (event) => {
    this.setState({ defSelected: event.target.value })

  }

  handleDateDebut = (e) => {
    var date = e.toLocaleDateString("fr-FR");
    this.setState({ dateDebut: date })

  }

  handleDateFin = (e) => {
    var date = e.toLocaleDateString("fr-FR");
    this.setState({ dateFin: date })
  }

  componentDidMount() {
 
  }

  provideChrono(){
    this.setState({ chronos: null})
    this.setState({ progress: null})
    
    var trotteur = this.state.motCle;
    var debut = this.state.dateDebut;
    var fin = this.state.dateFin;
    var chrono = this.state.chronoSelected;
    var premier = this.state.parametreSelected;
    
    var hippodrome = this.state.hippodromeSelected;
    var distance = this.state.distanceSelected;
    var categorie = this.state.categorieSelected;
    var depart = this.state.departSelected;
    var age = this.state.ageSelected;
    var sexe = this.state.sexeSelected;
    var deferrage = this.state.defSelected;

    fetch(Const.URL_PROVIDE_CHRONO_WS + `?token=${this.state.apiKey}&trotteur=${trotteur}&debut=${debut}&fin=${fin}&chrono=${chrono}&premier=${premier}&hippodrome=${hippodrome}&distance=${distance}&categorie=${categorie}&depart=${depart}&age=${age}&sexe=${sexe}&deferrage=${deferrage}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ progress: "n"})
        this.setState({ chronos: data.topChronoChart})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }
 
  //http://localhost:8080/topChronoWS?token=777&hippodrome=VINCENNES&distance=2%20850

  render() {
  return (
    <div className={this.classes.root}>
       <Grid container spacing={2}>
       
        <Grid item xs={8}>
        <Card>
          <CardHeader
            avatar={
              <TimerOutlinedIcon fontSize="large"/>   
            }
            
            title="Top Chrono"
            subheader="Référentiel des chronomètres"
          />
            <CardContent>
            { (this.state.chronos != null)  && (
              <div style={{width:"100%"}}>
                <ChronoBarChart data={this.state.chronos} />
              </div>
          ) }

          
          { (this.state.progress == null) && (<div style={{margin:"0.5em", marginTop:"3em"}}><center><CircularProgress disableShrink /></center></div>) }
          <div style={{margin:"1em"}}><Alert severity="info">Suivant les paramètres de filtrage, le temps de chargement du référentiel peut être impacté.</Alert></div>    
            {/*<Alert severity="info">Aucune détection.</Alert>*/}
            </CardContent>
          </Card>  
        </Grid>

         <Grid item xs={4}>
        <Card>
          <CardHeader
            avatar={
              <FilterListOutlinedIcon fontSize="large"/>   
            }
            
            title="Filtrer"
            subheader="Filtrer le référentiel chronomètres"
          />
 <CardContent>

        <FormControl size="small" fullWidth variant="outlined">
        <InputLabel>Trotteur</InputLabel>
          <OutlinedInput
            size="small"
            labelWidth={55}
            value={this.state.motCle}
            onChange={this.handleMotCle}
            endAdornment={<SearchOutlinedIcon position="end"></SearchOutlinedIcon>}
          />
        </FormControl>

      <Divider style={{marginTop:"1em"}}/>


           
            <div style={{marginBottom:"1em", marginTop:"1.5em"}}>
            <DatePickerDebut callbackHandleDateDebut={this.handleDateDebut}/>  
            </div>
            <div style={{marginBottom:"1em", marginTop:"1em"}}>
            <DatePickerFin callbackHandleDateFin={this.handleDateFin}/>  
            </div>

 <FormControl required size="small" fullWidth="true" variant="outlined">
        <InputLabel>Chronomètre</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.chronoSelected}
          labelWidth={100}
          fullWidth="true"
          onChange={this.handleChronoChange}
        >
        <MenuItem  value="TOTAL">TEMPS TOTAL</MenuItem>
        <MenuItem  value="RK">REDUCTION KILOMETRIQUE</MenuItem>
        </Select>
        </FormControl>

        <FormControl required style={{marginTop:"1em"}} size="small" fullWidth="true" variant="outlined">
        <InputLabel>Paramètres</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.parametreSelected}
          labelWidth={80}
          fullWidth="true"
          onChange={this.handleParametreChange}
        >
        <MenuItem  value="">AUCUN FILTRE</MenuItem>
        <MenuItem  value="N">TOUS CHRONO</MenuItem>
        <MenuItem  value="O">CHRONO DES GAGNANTS</MenuItem>
        </Select>
        </FormControl>

        <FormControl required style={{marginTop:"1em"}} size="small" fullWidth="true" variant="outlined">
        <InputLabel>Hippodrome</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.hippodromeSelected}
          labelWidth={90}
          fullWidth="true"
          onChange={this.handleHippodromeChange}
        >
        <MenuItem  value="">AUCUN FILTRE</MenuItem>
        <MenuItem  value="VINCENNES">VINCENNES</MenuItem>
        <MenuItem  value="CAGNES-SUR-MER">CAGNES-SUR-MER</MenuItem>
        <MenuItem  value="ENGHIEN">ENGHIEN</MenuItem>
        <MenuItem  value="CABOURG">CABOURG</MenuItem>
        <MenuItem  value="CAEN">CAEN</MenuItem>
        <MenuItem  value="GRAIGNES">GRAIGNES</MenuItem>
        </Select>
        </FormControl>

<        FormControl required style={{marginTop:"1em"}} size="small" fullWidth="true" variant="outlined">
        <InputLabel>Distance parcourue</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.distanceSelected}
          labelWidth={150}
          fullWidth="true"
          onChange={this.handleDistanceChange}
        >
        <MenuItem  value="">AUCUN FILTRE</MenuItem>
        <MenuItem  value="1 609">1 609</MenuItem>
        <MenuItem  value="2 050">2 050</MenuItem>
        <MenuItem  value="2 100">2 100</MenuItem>
        <MenuItem  value="2 175">2 175</MenuItem>
        <MenuItem  value="2 200">2 200</MenuItem>
        <MenuItem  value="2 250">2 250</MenuItem>
        <MenuItem  value="2 450">2 450</MenuItem>
        <MenuItem  value="2 475">2 475</MenuItem>
        <MenuItem  value="2 700">2 700</MenuItem>
        <MenuItem  value="2 725">2 725</MenuItem>
        <MenuItem  value="2 750">2 750</MenuItem>
        <MenuItem  value="2 775">2 775</MenuItem>
        <MenuItem  value="2 850">2 850</MenuItem>
        <MenuItem  value="2 875">2 875</MenuItem>
        <MenuItem  value="2 900">2 900</MenuItem>
        <MenuItem  value="2 925">2 925</MenuItem>
        <MenuItem  value="2 950">2 950</MenuItem>
        <MenuItem  value="3 000">3 000</MenuItem>
        <MenuItem  value="3 525">3 525</MenuItem>
        <MenuItem  value="4 125">4 125</MenuItem>
        <MenuItem  value="4 150">4 150</MenuItem>
        <MenuItem  value="4 400">4 400</MenuItem>

        
        </Select>
        </FormControl>

        <FormControl style={{marginTop:"1em"}} size="small" fullWidth="true" variant="outlined">
        <InputLabel>Catégorie</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.categorieSelected}
          labelWidth={70}
          fullWidth="true"
          onChange={this.handleCategorieChange}
        >
        <MenuItem  value="">AUCUN FILTRE</MenuItem>
        <MenuItem  value="GROUPE I">GROUPE I</MenuItem>
        <MenuItem  value="GROUPE II">GROUPE II</MenuItem>
        <MenuItem  value="GROUPE III">GROUPE III</MenuItem>
        <MenuItem  value="COURSE A">COURSE A</MenuItem>
        <MenuItem  value="COURSE B">COURSE B</MenuItem>
        <MenuItem  value="COURSE C">COURSE C</MenuItem>
        <MenuItem  value="COURSE D">COURSE D</MenuItem>
        <MenuItem  value="COURSE E">COURSE E</MenuItem>
        <MenuItem  value="COURSE F">COURSE F</MenuItem>
        <MenuItem  value="COURSE G">COURSE G</MenuItem>
        <MenuItem  value="COURSE G">A RECLAMER</MenuItem>
        <MenuItem  value="COURSE G">INTERNATIONALE</MenuItem>
               
        </Select>
        </FormControl>

        <FormControl  style={{marginTop:"1em"}} size="small" fullWidth="true" variant="outlined">
        <InputLabel>Mode de départ</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.departSelected}
          labelWidth={115}
          fullWidth="true"
          onChange={this.handleDepartChange}
        >
        <MenuItem  value="">AUCUN FILTRE</MenuItem>
        <MenuItem  value="O">AUTOSTART</MenuItem>
        <MenuItem  value="N">VOLTE / ELASTIQUE</MenuItem>
        </Select>
        </FormControl>

        <FormControl  style={{marginTop:"1em"}} size="small" fullWidth="true" variant="outlined">
        <InputLabel>Age du trotteur</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.ageSelected}
          labelWidth={110}
          fullWidth="true"
          onChange={this.handleAgeChange}
        >
        <MenuItem  value="">AUCUN FILTRE</MenuItem>
        <MenuItem  value="2">2</MenuItem>
        <MenuItem  value="3">3</MenuItem>
        <MenuItem  value="4">4</MenuItem>
        <MenuItem  value="5">5</MenuItem>
        <MenuItem  value="6">6</MenuItem>
        <MenuItem  value="7">7</MenuItem>
        <MenuItem  value="8">8</MenuItem>
        <MenuItem  value="9">9</MenuItem>
        <MenuItem  value="10">10</MenuItem>
        <MenuItem  value="11">11</MenuItem>
        <MenuItem  value="12">12</MenuItem>
        <MenuItem  value="13">13</MenuItem>
        <MenuItem  value="14">14</MenuItem>
        <MenuItem  value="15">15</MenuItem>
        </Select>
        </FormControl>

         <FormControl  style={{marginTop:"1em"}} size="small" fullWidth="true" variant="outlined">
        <InputLabel>Sexe du trotteur</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.sexeSelected}
          labelWidth={115}
          fullWidth="true"
          onChange={this.handleSexeChange}
        >
        <MenuItem  value="">AUCUN FILTRE</MenuItem>
        <MenuItem  value="M">MÂLE</MenuItem>
        <MenuItem  value="F">FEMELLE</MenuItem>
        <MenuItem  value="H">HONGRE</MenuItem>
        </Select>
        </FormControl>

        <FormControl  style={{marginTop:"1em"}} size="small" fullWidth="true" variant="outlined">
        <InputLabel>Déferrage du trotteur</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.defSelected}
          labelWidth={150}
          fullWidth="true"
          onChange={this.handleDefChange}
        >
         <MenuItem  value="">AUCUN FILTRE</MenuItem>
        <MenuItem  value="D4">DES QUATRE PIEDS</MenuItem>
        <MenuItem  value="A">DES ANTÉRIEURS</MenuItem>
        <MenuItem  value="P">DES POSTÉRIEURS</MenuItem>
        <MenuItem  value="F">NON-DÉFERRÉ</MenuItem>
        
        </Select>
        </FormControl>

         <Grid container style={{marginTop:"1em"}}>
        <Grid item xs={12}>
          <Button style={{float:"left"}} size="small"  onClick={() => this.provideChrono() } variant="outlined">AFFICHER LES CHRONO</Button>
        </Grid>
      </Grid>

            </CardContent>
          </Card>  
        </Grid>

      </Grid>
    </div>
  )}
}

export default PageTopChrono;