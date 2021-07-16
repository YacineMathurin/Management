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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableClassementTrotteur from './TableClassementTrotteur'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import Alert from '@material-ui/lab/Alert';
import { listeHippodromes } from './data/dataHippodromes';
import { listeCordes } from './data/dataCordes';
import { listeCategories } from './data/dataCategories';
import { listeDistances } from './data/dataDistances';
import { listeJours } from './data/dataJours';
import { listePeriodes } from './data/dataPeriodes';
import { listeDisciplines } from './data/dataDisciplines';
import { listeTypeCourses } from './data/dataTypeCourses';
import { listeNombrePartants} from './data/dataNombrePartants';
import { listeDeparts} from './data/dataDeparts';
import { listeNumeroCourses} from './data/dataNumeroCourses';
import { listeDrivers} from './data/dataDrivers';
import { listeEntraineurs} from './data/dataEntraineurs';
import { listeSexes} from './data/dataSexes';
import { listeAges} from './data/dataAges';
import { listeDefs} from './data/dataDefs';
import { listeNumeroTrotteurs} from './data/dataNumeroTrotteurs';
import { listePoids} from './data/dataPoids';
import { listeCotes} from './data/dataCotes';
import { listeDernierePerf} from './data/dataDernierePerf';
import { listeRegularites} from './data/dataRegularites';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class PageRecherche extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: this.props.apiKey,
      synthese : null,
      checkboxHippodromeNational : false,
      selectHippo: localStorage.getItem('selectHippo') ,
      selectDiscipline: localStorage.getItem('selectDiscipline') ,
      selectCorde: localStorage.getItem('selectCorde') ,
      selectCategorie: localStorage.getItem('selectCategorie') ,
      selectDistance: localStorage.getItem('selectDistance') ,
      selectTypeCourse: localStorage.getItem('selectTypeCourse') ,
      selectNombrePartant: localStorage.getItem('selectNombrePartant') ,
      selectDepart: localStorage.getItem('selectDepart') ,
      selectNumeroCourse: localStorage.getItem('selectNumeroCourse') ,
      selectSexe: localStorage.getItem('selectSexe') ,
      selectAge: localStorage.getItem('selectAge') ,
      selectDef: localStorage.getItem('selectDef') ,
      selectNumeroTrotteur: localStorage.getItem('selectNumeroTrotteur') ,
      selectPoids: localStorage.getItem('selectPoids') ,
      selectCotes: localStorage.getItem('selectCotes') ,
      selectDernierePerfs: localStorage.getItem('selectDernierePerfs') ,
      selectRegularites: localStorage.getItem('selectRegularites') ,
      selectDrivers: localStorage.getItem('selectDrivers') ,
      selectEntraineurs: localStorage.getItem('selectEntraineurs') ,

    }
    this.handleChangeHippodromeNational = this.handleChangeHippodromeNational.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

handleChange(rubrique, value) {
  this.setState({[rubrique]: value}, () => {
    if(value == null){
      localStorage.removeItem(rubrique);  
    }else{
      localStorage.setItem(rubrique, value)
    }
  })
}
 
reset(){
  this.setState({"selectHippo": ""});
  this.setState({"selectDiscipline": ""});
  this.setState({"selectCorde": ""});
  this.setState({"selectCategorie": ""});
  this.setState({"selectDistance": ""});
  this.setState({"selectTypeCourse": ""});
  this.setState({"selectNombrePartant": ""});
  this.setState({"selectDepart": ""});
  this.setState({"selectNumeroCourse": ""});
  this.setState({"selectSexe": ""});
  this.setState({"selectAge": ""});
  this.setState({"selectDef": ""});
  this.setState({"selectNumeroTrotteur": ""});
  this.setState({"selectPoids": ""});
  this.setState({"selectCotes": ""});
  this.setState({"selectDernierePerfs": ""});
  this.setState({"selectRegularites": ""});
  this.setState({"selectDrivers": ""});
  this.setState({"selectEntraineurs": ""});

  localStorage.clear();
}

goResultat(data) {
  this.props.callbackToResultatRecherche(data)
}

recherche(){
 
  var bundle = new Object();

  bundle.hippodrome  = this.state.selectHippo;
  bundle.discipline = this.state.selectDiscipline;
  bundle.corde = this.state.selectCorde;
  bundle.categorie = this.state.selectCategorie;
  bundle.distance = this.state.selectDistance;
  bundle.typeCourse = this.state.selectTypeCourse;
  bundle.nombrePartant = this.state.selectNombrePartant;
  bundle.depart = this.state.selectDepart;
  bundle.numeroCourse = this.state.selectNumeroCourse;
  bundle.sexe = this.state.selectSexe
  bundle.age = this.state.selectAge;
  bundle.deferrage = this.state.selectDef;
  bundle.numeroTrotteur = this.state.selectNumeroTrotteur;
  bundle.poids = this.state.selectPoids;
  bundle.cote = this.state.selectCotes;
  bundle.dernierePerf = this.state.selectDernierePerfs;
  bundle.regularite = this.state.selectRegularites;
  bundle.driver = this.state.selectDrivers;
  bundle.entraineur = this.state.selectEntraineurs;
 
  bundle = JSON.stringify(bundle);
  console.log(bundle);
  
  fetch(`http://vps-17d340a0.vps.ovh.net:8080/rechercheAvanceeSelectionWS?token=${this.state.apiKey}&requete=${bundle}`, { retry: 3, retryDelay: 1000 })
  .then(res => res.json())
  .then((data) => {
    console.log("requete SQL : " + data.temps + " " + data.nbCourse + " course(s)");
    this.goResultat(data);
  })
  .catch(console.log)

}

  handleCallbackViewDetails = (data) => {
    this.props.callbackViewDetails(data)
  } 

  handleCallbackViewEdit = (data) => {
    this.props.callbackViewEdit(data)
  }

  handleChangeHippodromeNational(event) {
    
    var d = this.state.checkboxHippodromeNational;

    if(d == false){
      this.setState({checkboxHippodromeNational: true})
    }else{
      this.setState({checkboxHippodromeNational: false})
    }
  }


  render() {
  return (
    <div className={this.classes.root}>
      <CssBaseline />
     <NavBar/>
    
    {/* Section recherche  */}
      
      <Container style={{minWidth:'950px', maxWidth:'950px', backgroundColor: '#FAFBFC',height: '100%' }}>
      
      <Card>
      <CardContent>

      <Card>
        <CardContent>

      <Grid container>
      <Grid item xs={7}>
      
      </Grid>
      <Grid item xs={2}>
      <Button
        style={{float:'right'}}
        variant="contained"
        onClick={() => {this.reset()}}
        color="grey"
        startIcon={<ClearIcon />}
      >
        Effacer
      </Button>
      </Grid>

      <Grid item xs={3}>
      <Button
        style={{float:'right'}}
        variant="contained"
        onClick={() => {this.recherche()}}
        color="primary"
        startIcon={<SearchIcon />}
      >
        Rechercher
      </Button>

      
      </Grid>
      </Grid>
      
        </CardContent>
      </Card>


      
      {/*<Grid style={{marginTop:"1em"}} item xs={12}>
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.checkboxHippodromeNational}
            onChange={this.handleChangeHippodromeNational}
            name="checkedB"
            color="primary"
          />
        }
        label="seulement les hippodromes de catégorie national"
      />
      </Grid>*/}

     

      <ExpansionPanel style={{marginTop:"1em"}} defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
      <Typography className={this.classes.heading}>Condition de course</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>    

      <Grid container>

    <Grid item xs={12}>

    <Autocomplete
    style={{width:"800px"}}
      id="selectHippo"
      value={this.state.selectHippo}
      onChange={(event, value) => this.handleChange("selectHippo",value)}
      freeSolo
      options={listeHippodromes.map(option => option.hippodrome)}
      renderInput={params => (
        <TextField style={{width:"800px"}} {...params} label="Hippodrome" margin="normal" variant="outlined" />
      )}
    />
    </Grid>

      <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectDiscipline"
          value={this.state.selectDiscipline}
          onChange={(event, value) => this.handleChange("selectDiscipline",value)}
          freeSolo
          options={listeDisciplines.map(option => option.discipline)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Discipline" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
      <Autocomplete
        style={{width:"390"}}
          id="selectCorde"
          value={this.state.selectCorde}
          onChange={(event, value) => this.handleChange("selectCorde",value)}
          freeSolo
          options={listeCordes.map(option => option.corde)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Sens de la corde" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectCategorie"
          value={this.state.selectCategorie}
          onChange={(event, value) => this.handleChange("selectCategorie",value)}
          freeSolo
          options={listeCategories.map(option => option.categorie)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Catégorie" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
      <Autocomplete
        style={{width:"390"}}
          id="selectDistance"
          value={this.state.selectDistance}
          onChange={(event, value) => this.handleChange("selectDistance",value)}
          freeSolo
          options={listeDistances.map(option => option.distance)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Distance en mètre" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectTypeCourse"
          value={this.state.selectTypeCourse}
          onChange={(event, value) => this.handleChange("selectTypeCourse",value)}
          freeSolo
          options={listeTypeCourses.map(option => option.type)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Niveau" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
      <Autocomplete
        style={{width:"390"}}
          id="selectNombrePartant"
          value={this.state.selectNombrePartant}
          onChange={(event, value) => this.handleChange("selectNombrePartant",value)}
          freeSolo
          options={listeNombrePartants.map(option => option.partant)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Nombre de partant" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectDepart"
          value={this.state.selectDepart}
          onChange={(event, value) => this.handleChange("selectDepart",value)}
          freeSolo
          options={listeDeparts.map(option => option.depart)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Départ" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
      <Autocomplete
        style={{width:"390"}}
          id="selectNumeroCourse"
          value={this.state.selectNumeroCourse}
          onChange={(event, value) => this.handleChange("selectNumeroCourse",value)}
          freeSolo
          options={listeNumeroCourses.map(option => option.numero)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Numéro de la course" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      </Grid>

      </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel style={{marginTop:"1em"}} defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
      <Typography className={this.classes.heading}>Trotteur</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>    
      <Grid container>
      <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectSexe"
          value={this.state.selectSexe}
          onChange={(event, value) => this.handleChange("selectSexe",value)}
          freeSolo
          options={listeSexes.map(option => option.sexe)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Sexe" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectAge"
          value={this.state.selectAge}
          onChange={(event, value) => this.handleChange("selectAge",value)}
          freeSolo
          options={listeAges.map(option => option.age)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Age" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectDef"
          value={this.state.selectDef}
          onChange={(event, value) => this.handleChange("selectDef",value)}
          freeSolo
          options={listeDefs.map(option => option.def)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Déférrage" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectNumeroTrotteur"
          value={this.state.selectNumeroTrotteur}
          onChange={(event, value) => this.handleChange("selectNumeroTrotteur",value)}
          freeSolo
          options={listeNumeroTrotteurs.map(option => option.numero)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Numéro du trotteur" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

       <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectPoids"
          value={this.state.selectPoids}
          onChange={(event, value) => this.handleChange("selectPoids",value)}
          freeSolo
          options={listePoids.map(option => option.poids)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Poids en Kg" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectCotes"
          value={this.state.selectCotes}
          onChange={(event, value) => this.handleChange("selectCotes",value)}
          freeSolo
          options={listeCotes.map(option => option.cote)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Cotation PMU" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

       <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectDernierePerfs"
          value={this.state.selectDernierePerfs}
          onChange={(event, value) => this.handleChange("selectDernierePerfs",value)}
          freeSolo
          options={listeDernierePerf.map(option => option.perf)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Dernière performance" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
        style={{width:"390px"}}
          id="selectRegularites"
          value={this.state.selectRegularites}
          onChange={(event, value) => this.handleChange("selectRegularites",value)}
          freeSolo
          options={listeRegularites.map(option => option.regularite)}
          renderInput={params => (
            <TextField style={{width:"390px"}} {...params} label="Régularité" margin="normal" variant="outlined" />
          )}
        />
      </Grid>

      </Grid>

      </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel style={{marginTop:"1em"}} defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
      <Typography className={this.classes.heading}>Driver / Jockey</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails> 
      
      <Grid container>
      <Grid item xs={12}>
        <Autocomplete
        style={{width:"800px"}}
          id="selectDrivers"
          value={this.state.selectDrivers}
          onChange={(event, value) => this.handleChange("selectDrivers",value)}
          freeSolo
          options={listeDrivers.map(option => option.driver)}
          renderInput={params => (
            <TextField style={{width:"800px"}} {...params} label="Nom" margin="normal" variant="outlined" />
          )}
        />
      </Grid>
      </Grid>

      </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel style={{marginTop:"1em"}} defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
      <Typography className={this.classes.heading}>Entraineur</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>    
      <Grid container>
      <Grid item xs={12}>
        <Autocomplete
        style={{width:"800px"}}
          id="selectEntraineurs"
          value={this.state.selectEntraineurs}
          onChange={(event, value) => this.handleChange("selectEntraineurs",value)}
          freeSolo
          options={listeEntraineurs.map(option => option.entraineur)}
          renderInput={params => (
            <TextField style={{width:"800px"}} {...params} label="Nom" margin="normal" variant="outlined" />
          )}
        />
      </Grid>
      </Grid>
      </ExpansionPanelDetails>
      </ExpansionPanel>
      </CardContent>
    
    </Card>


      

      </Container>
    </div>
  )}
}

export default PageRecherche;