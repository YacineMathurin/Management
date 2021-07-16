import React from "react";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';
import Alert from '@material-ui/lab/Alert';
import TodayIcon from '@material-ui/icons/Today';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class BoiteRechercheSelection extends React.Component {
  constructor(props) {
    console.log('call constructor')
    super(props);
    this.state = {
      apiKey : props.apiKey,
      selectHippodrome : '-',
      selectCourse : '-',
	    selectDriver : '-',
	    selectEntraineur : '-',
      selectTrotteur : '-',
      selectDate : '-'
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleHippodromeChange = this.handleHippodromeChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleDriverChange = this.handleDriverChange.bind(this);
    this.handleEntraineurChange = this.handleEntraineurChange.bind(this);
    this.handleTrotteurChange = this.handleTrotteurChange.bind(this);
  }

  appelDonneesJourWS(date){
    fetch(`http://vps-17d340a0.vps.ovh.net:8080/donneesJourWS?token=${this.state.apiKey}&DATE=${date}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
		  this.hippodromes = data.hippodromes
		  this.courses = data.courses
		  this.drivers = data.drivers
		  this.entraineurs = data.entraineurs
      this.trotteurs = data.trotteurs
      this.dates = data.dates
      // we get the values for the dropdown = safe to set the defaut one (from storage)
      // otherwise we get  a non null value from storage in a null dropdown array
      const hippodrome = localStorage.getItem('selectHippodrome') ? localStorage.getItem('selectHippodrome') : '-'
      const course = localStorage.getItem('selectCourse') ? localStorage.getItem('selectCourse') : '-'
      const driver = localStorage.getItem('selectDriver') ? localStorage.getItem('selectDriver') : '-'
      const entraineur = localStorage.getItem('selectEntraineur') ? localStorage.getItem('selectEntraineur') : '-'
      const trotteur = localStorage.getItem('selectTrotteur') ? localStorage.getItem('selectTrotteur') : '-'
      const dates = localStorage.getItem('selectDate') ? localStorage.getItem('selectDate') : '-'

      this.setState({
        selectHippodrome: hippodrome,
        selectCourse: course,
        selectDriver: driver,
        selectEntraineur: entraineur,
        selectTrotteur: trotteur,
        selectDate: dates,
      }, () => {
        this.validationRecherche() // setState is async, do recherche once all states are ok
      });
    })
    .catch(console.log) 
  }

  componentDidMount() {
    const d = localStorage.getItem('selectDate') ? localStorage.getItem('selectDate') : 'JOUR'
    this.appelDonneesJourWS(d);
  } 
 
  handleDateChange(event) {
    
    var d = event.target.value;

    this.setState({selectDate: event.target.value}, () => {
      localStorage.setItem('selectDate', event.target.value)
      this.appelDonneesJourWS(d);
      this.resetFormulaire();
    })
  }

  handleHippodromeChange(event) {
    this.setState({selectHippodrome: event.target.value}, () => {
      localStorage.setItem('selectHippodrome', event.target.value)
      this.validationRecherche()
    })
  }
  
  handleCourseChange(event) {
    this.setState({selectCourse: event.target.value}, () => {
      localStorage.setItem('selectCourse', event.target.value)
      this.validationRecherche()
    })
  }
  
  handleDriverChange(event) {
    this.setState({selectDriver: event.target.value}, () => {
      localStorage.setItem('selectDriver', event.target.value)
      this.validationRecherche()
    })
  }
  
  handleEntraineurChange(event) {
    this.setState({selectEntraineur: event.target.value}, () => {
      localStorage.setItem('selectEntraineur', event.target.value)
      this.validationRecherche()
    })
  }
  
  handleTrotteurChange(event) {
    this.setState({selectTrotteur: event.target.value}, () => {
      localStorage.setItem('selectTrotteur', event.target.value)
      this.validationRecherche()
    })
  }
  
  resetFormulaire(){
    localStorage.setItem('selectHippodrome', '-')
    localStorage.setItem('selectCourse', '-')
    localStorage.setItem('selectDriver', '-')
    localStorage.setItem('selectEntraineur', '-')
    localStorage.setItem('selectTrotteur', '-')
    
    this.setState({
      selectHippodrome: '-',
      selectCourse: '-',
      selectDriver: '-',
      selectEntraineur: '-',
      selectTrotteur: '-',
    }, () => {
      this.validationRecherche() // setState is async, do recherche once all states are ok
    });
  }
 
  validationRecherche() {
	  
	console.log(this.state.selectHippodrome 
		+ " " + this.state.selectCourse
		+ " " + this.state.selectDriver
		+ " " + this.state.selectEntraineur
		+ " " + this.state.selectTrotteur);
  
  // si on mets l'url sur plusieures lignes attention de ne pas introduire de characteres invisibles
  fetch(`http://vps-17d340a0.vps.ovh.net:8080/rechercheSelectionSimpleWS?token=${this.state.apiKey}&hippodrome=${this.state.selectHippodrome}&course=${this.state.selectCourse}&driver=${this.state.selectDriver}&entraineur=${this.state.selectEntraineur}&trotteur=${this.state.selectTrotteur}&date=${this.state.selectDate}`, { retry:3, retryDelay:1000 })
    .then(res => res.json())
    .then((data) => {
      if (this.state.detail.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      }
      this.props.callbackFilterChange(data.table)
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }
  
  render() {

    return (
      <div>

       <div>
      <div style={{float:"left",  width:"415px"}}>
      <FormControl variant="outlined" >
      <InputLabel>Programme des courses</InputLabel>
      <Select
      style={{width:"400px"}}
      labelWidth={180}
      value={this.state.selectDate}
      onChange={this.handleDateChange}
      >
    
      { (this.dates != null) && (
        this.dates.map((date) => {
          return ( <MenuItem value={date}>{date}</MenuItem>);
        })
      ) }
      { (this.dates == null) && (<center><CircularProgress disableShrink /></center>) }
      </Select>
	  </FormControl>
    </div>


    <div style={{float:"right", width:"400px", marginRight:"1em"}}>
    <Alert icon={<TodayIcon fontSize="inherit" />} severity="info">Préparez vos jeux avec le programme des courses</Alert>

    </div>
    </div>
        
        
        <div style={{marginTop:"5em"}}>
      <div style={{float:"left",  width:"415px"}}>
      <FormControl variant="outlined" >
      <InputLabel>Hippodrome</InputLabel>
      <Select
      style={{width:"400px"}}
      labelWidth={90}
        value={this.state.selectHippodrome}
        onChange={this.handleHippodromeChange}
      >
      <MenuItem value='-'>-</MenuItem>
      { (this.hippodromes != null) && (
        this.hippodromes.map((hippodrome) => {
          return ( <MenuItem value={hippodrome}>{hippodrome}</MenuItem>);
        })
      ) }
      { (this.hippodromes == null) && (<center><CircularProgress disableShrink /></center>) }
      </Select>
	  </FormControl>
    </div>


    <div style={{float:"right", width:"415px", marginLeft:"1px"}}>
	  <FormControl variant="outlined" >
    <InputLabel>Course</InputLabel>
      <Select
      style={{width:"400px"}}
      labelWidth={55}
        value={this.state.selectCourse}
        onChange={this.handleCourseChange}
      >
      <MenuItem value='-'>-</MenuItem>
      { (this.courses != null) && (
        this.courses.map((course) => {
          return ( <MenuItem value={course}>{course}</MenuItem>);
        })
      )}
      { (this.courses == null) && (<center><CircularProgress disableShrink /></center>) }
      </Select>
	  </FormControl>
    </div>
    </div>
	
    <div style={{marginTop:"10em"}}>
      <div style={{float:"left",  width:"415px"}}>
      <FormControl variant="outlined" >
      <InputLabel>Driver</InputLabel>
      <Select
      style={{width:"400px"}}
      labelWidth={50}
        value={this.state.selectDriver}
        onChange={this.handleDriverChange}
      >
      <MenuItem value='-'>-</MenuItem>
      { (this.drivers != null) && (
        this.drivers.map((driver) => {
          return ( <MenuItem value={driver}>{driver}</MenuItem>);
        })
      ) }
      { (this.drivers == null) && (<center><CircularProgress disableShrink /></center>) }
      </Select>
	  </FormControl>
    </div>


    <div style={{float:"right", width:"415px", marginLeft:"1px"}}>
	  <FormControl variant="outlined" >
    <InputLabel>Entraineur</InputLabel>
      <Select
      style={{width:"400px"}}
      labelWidth={75}
        value={this.state.selectEntraineur}
        onChange={this.handleEntraineurChange}
      >
      <MenuItem value='-'>-</MenuItem>
      { (this.entraineurs != null) && (
        this.entraineurs.map((entraineur) => {
          return ( <MenuItem value={entraineur}>{entraineur}</MenuItem>);
        })
      ) }
      { (this.entraineurs == null) && (<center><CircularProgress disableShrink /></center>) }
      </Select>
	  </FormControl>
    </div>
    </div>

    <div style={{marginTop:"15em"}}>
      <div style={{float:"left",  width:"415px"}}>
      <FormControl variant="outlined" >
      <InputLabel>Trotteur</InputLabel>
      <Select
      style={{width:"400px"}}
      labelWidth={55}
        value={this.state.selectTrotteur}
        onChange={this.handleTrotteurChange}
      >
      <MenuItem value='-'>-</MenuItem>
      { (this.trotteurs != null) && (
        this.trotteurs.map((trotteur) => {
          return ( <MenuItem value={trotteur}>{trotteur}</MenuItem>);
        })
      ) }
      { (this.trotteurs == null) && (<center><CircularProgress disableShrink /></center>) }
      </Select>
	  </FormControl>
    </div>
    <div style={{float:"right", width:"415px", marginLeft:"1px"}}>
        <Fab onClick={() => {this.resetFormulaire()}} style={{float:'right',marginBottom:'1em', marginRight:'1em'}} color="primary" aria-label="Recherche">
          <ClearIcon />
        </Fab>
        <a target="_blank" href="./DTF_MANUEL.pdf">
         <Fab style={{float:'right',marginBottom:'1em', marginRight:'1em', marginTop:"0.5em"}} size="small" color="secondary" aria-label="Aide">
          <HelpOutlineIcon />
        </Fab>
        </a>
    </div>
    

    </div></div>
    );
 }
}

export default BoiteRechercheSelection;
