import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExtensionIcon from '@material-ui/icons/Extension';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import React from 'react';
import TableMonDossier from './TableMonDossier';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

import ReactFilterBox from "react-filter-box";
import "react-filter-box/lib/react-filter-box.css";
import data from "./data/data";
import { rubriques } from './data/rubriques';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import TableProgrammePartants from './TableProgrammePartants';
import * as Const from './Constant';
import HistoryIcon from '@material-ui/icons/History';
import DialogEnregistrer from './DialogEnregistrer';
import DialogOuvrir from './DialogOuvrir';
import DialogTest from './DialogTest';
import Toast from './Toast';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ComposantFiche from './ComposantFiche';
import ComposantTest from './ComposantTest';
import ComposantAnalyse from './ComposantAnalyse';
import CallSplitOutlinedIcon from '@material-ui/icons/CallSplitOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import TableProgrammeCourses from './TableProgrammeCourses';
import ComposantStatsTrotteur from './ComposantStatsTrotteur';
import ComposantStatsDriver from './ComposantStatsDriver';
import ComposantStatsEntraineur from './ComposantStatsEntraineur';

class PageScreener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      synthese : null,
      syntheseCourse : null,
      loading: 0,
      erreur: "",
      filterBoxQuery : localStorage.getItem('lastQuery') ? localStorage.getItem('lastQuery') : "", 
      // requete qu'on doit chercher - filterBoxQueryToSearch est update a chaque edit de la box (mais on force pas 
      // l'affichage sinon on a le bug : revient en fin de ligne - car ca revient a afficher un champ texte)
      filterBoxQueryToSearch: localStorage.getItem('lastQuery') ? localStorage.getItem('lastQuery') : "", 
      // requete a mettre en memoire, lastQuery = filterBoxQueryToSearch = filterBoxQuery quand l'utilisateur clique sur Search
      lastQuery: "",
      date: localStorage.getItem('date') ? localStorage.getItem('date') : "jour",
      openDialogEnregistrer: false,
      openDialogOuvrir: false,
      openDialogTest: false,
      openDialogAnalyse: false,
      showToastEnregistrerSuccess: 0,
      selectionChoix: "",
      openDrawer: false,
      openDrawerTest: false,
      trotteurSelec: "",
      driverSelec : "",
      entraineurSelec: "",
      hippodromeSelec: "",
      vue: "courses",
    
    }
    this.visiblePartant = "hidden"
    this.displayPartant = "none"
    this.visibleCourse = "visible"
    this.displayCourse = "block"
  }

  handleVue  = (event, newDate) => {
    this.setState( { vue: newDate })
    this.state.vue = newDate;
    if(this.state.vue == null){
      this.state.vue = "courses";
      this.setState( { vue: "courses" })
    }

    if(this.state.vue == "partants"){
      this.visibleCourse = "hidden"
      this.displayCourse = "none"
      this.visiblePartant = "visible"
      this.displayPartant = "block"
    }else{
      this.visiblePartant = "hidden"
      this.displayPartant = "none"
      this.visibleCourse = "visible"
      this.displayCourse = "block"
    }
    
  }

  handleRecherche = () => {
    this.updateTable()
  }
  
  ReactFilterBoxOnChange = (query, result) => {
    this.state.filterBoxQueryToSearch = query;
    //this.setState( { filterBoxQueryToSearch: query })
  }


  handleDate  = (event, newDate) => {
    this.setState( { date: newDate })
    this.state.date = newDate;
    this.updateTable();
  }

  updateTable(){
    this.setState({ loading: 1});

    var date = this.state.date;

    fetch(Const.URL_PROVIDE_PROGRAMME_PARTANTS + `?token=${this.state.apiKey}&date=${date}&requete=${this.state.filterBoxQueryToSearch}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ erreur: data.message})
        this.setState({ synthese: data.programmePartants})
        this.setState({ syntheseCourse: data.programmeCourses})
        this.setState({ loading: 0});
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }
  

  componentDidMount() {
   this.updateTable();
  } 

  handleCallRetourDetails = (requete) => {
    localStorage.setItem("lastQuery", requete.requeteDTF);
    localStorage.setItem("lastTypePari", requete.typePari);
    
    this.props.callbackRetourDetails(requete)
  } 

  handleEnregistrer = () => {
    this.setState( { openDialogEnregistrer: true })
  }

  handleCloseEnregistrer = (value) => {
    this.setState( { openDialogEnregistrer: false })
  } 

  handleOuvrir = () => {
    this.setState( { openDialogOuvrir: true })
  }

  handleCloseOuvrir = (value) => {
    this.setState( { openDialogOuvrir: false })
  } 

  handleTest = () => {
    this.setState( { openDialogTest: true })
  }

  handleAnalyse = () => {
    this.setState( { openDialogAnalyse: true })
  }
  
  handleCloseTest = (value) => {
    this.setState( { openDialogTest: false })
  } 

  handleCloseAnalyse = (value) => {
    this.setState( { openDialogAnalyse: false })
  } 

  notificationEnregistrer = () => {
    this.setState( { showToastEnregistrerSuccess: 1 })
  }

  handleDrawerOpen = (trotteur, driver, entraineur, hippodrome) => {
    this.trotteurSelec = trotteur;
    this.driverSelec = driver;
    this.entraineurSelec = entraineur;
    this.hippodromeSelec = hippodrome;
    this.setState( { openDrawer: true })
  }

  handleDrawerOpenAnalyse = () => {
    this.setState( { openDrawerAnalyse: true })
  }

  handleDrawerOpenStatsTrotteur = () => {
    this.setState( { openDrawerStatsTrotteur: true })
  }

  handleDrawerOpenStatsDriver = () => {
    this.setState( { openDrawerStatsDriver: true })
  }

  handleDrawerOpenStatsEntraineur = () => {
    this.setState( { openDrawerStatsEntraineur: true })
  }

  callbackFilterReunion = (reunion) => {
   
   this.setState( { filterBoxQuery: "Hippodrome.Reunion == " + reunion })   
   this.setState( { filterBoxQueryToSearch: "Hippodrome.Reunion == " + reunion })   
   
  }

  callbackFilterCourse = (reunion, course) => {
   
    this.setState( { filterBoxQuery: "Hippodrome.Reunion == " + reunion + " ET Course.Numero == " + course })   
    this.setState( { filterBoxQueryToSearch: "Hippodrome.Reunion == " + reunion + " ET Course.Numero == " + course})   
    
   }

  handleDrawerCloseAnalyse = (res) => {
    this.setState( { openDrawerAnalyse: false })
    
    if(res == "OVERSIZE_ANALYSE"){
      this.handleTest()
    }
  }

  handleDrawerCloseStatsTrotteur = () => {
    this.setState( { openDrawerStatsTrotteur: false })
  }

  handleDrawerCloseStatsDriver = () => {
    this.setState( { openDrawerStatsDriver: false })
  }

  handleDrawerCloseStatsEntraineur = () => {
    this.setState( { openDrawerStatsEntraineur: false })
  }

  handleDrawerOpenTest = () => {
    this.setState( { openDrawerTest: true })
  }

  handleDrawerClose = () => {
    this.setState( { openDrawer: false })
  }

  handleDrawerCloseTest = (res) => {
    this.setState( { openDrawerTest: false })
    
    if(res == "OVERSIZE"){
      this.handleTest()
    }
  }

  moreStatsTrotteur =() => {
    this.handleDrawerClose()
    this.handleDrawerOpenStatsTrotteur()
  }

  moreStatsDriver =() => {
    this.handleDrawerClose()
    this.handleDrawerOpenStatsDriver()
  }

  moreStatsEntraineur =() => {
    this.handleDrawerClose()
    this.handleDrawerOpenStatsEntraineur()
  }

  selectionChoisie = (selec) => {
    
    this.selectionChoix = selec;
    this.setState( { openDialogOuvrir: false })
    //call update Table avec requete choisie
    
    this.setState( { filterBoxQuery: this.selectionChoix })   
    this.setState( { filterBoxQueryToSearch: this.selectionChoix })   
  }


  classes = makeStyles((theme: Theme) =>
    createStyles({
    }),
  );

 

  render() {
  return (
    <div className={this.classes.root}>
     
    {/* Section recherche  */}
    <Container style={{minWidth:'1250px', maxWidth:'1250px', backgroundColor: '#FAFBFC',height: '100%' }}>
    
    
    <Card>
    <CardContent>
  
    <Typography color="textSecondary" gutterBottom variant="h5" style={{color:"#454E54", lineHeight:"0.5em"}}>Recherche</Typography>
    <div style={{marginTop:"1em"}}></div>
    <Typography color="textSecondary" gutterBottom variant="body1">Composez votre sélection de chevaux.</Typography>
    
    <Grid style={{marginTop:"1.5em"}} container>

    <Grid style={{marginBottom:"1em"}} item xs={12}>
        <ToggleButtonGroup
          size="small"
          value={this.state.vue}
          exclusive
          onChange={this.handleVue}
          aria-label=""
          >
          <ToggleButton size="small" value="courses" aria-label="bold">
          <Tooltip arrow title={<h3>Vue Course</h3>}>
          <FlagOutlinedIcon fontSize="small" />
          </Tooltip>
          </ToggleButton>

          <ToggleButton size="small" value="partants" aria-label="bold">
          <Tooltip arrow title={<h3>Vue Partant</h3>}>
          <SupervisorAccountOutlinedIcon fontSize="small" />
          </Tooltip>
          </ToggleButton>
          
        </ToggleButtonGroup>
        </Grid>

    <Grid item xs={12}  style={{marginBottom:"1em"}}>
    
      <div>
      { (this.state.syntheseCourse != null  ) && (
      <div  style={{display:this.displayCourse, visible:this.visibleCourse}} >
        <TableProgrammeCourses  apiKey = { this.props.apiKey } syntheseCourse = {this.state.syntheseCourse} callbackFilterReunion = {this.callbackFilterReunion} callbackFilterCourse = {this.callbackFilterCourse} callbackNeedToLogin = { this.props.callbackNeedToLogin } callbackDetailsSelection = { this.handleCallbackViewDetails }></TableProgrammeCourses>      
      </div>
      )}
      { (this.state.synthese != null  ) && (
      <div  style={{display:this.displayPartant, visible:this.visiblePartant}} >
        <TableProgrammePartants openDrawer={this.handleDrawerOpen} apiKey = { this.props.apiKey } synthese = {this.state.synthese} callbackNeedToLogin = { this.props.callbackNeedToLogin } callbackDetailsSelection = { this.handleCallbackViewDetails }></TableProgrammePartants>      
      </div>
      )}
      </div>
    
    </Grid>

    {/* ERREUR LORS DE LA RECHERCHE  */}
    { (this.state.erreur != null && this.state.synthese == null  && this.state.loading == 0) && (
      <Grid item xs={12}  style={{marginBottom:"1em"}}>
      <Alert severity="warning">
        <AlertTitle>Recherche en échec</AlertTitle>
          <span>Nous avons rencontré un problème lors du traitement de votre recherche.</span><br/>
          <span>Merci de vérifier vos valeurs de recherche.</span><br/><br/>
          <span>Besoin d'aide ? Merci de contacter : <b>support@dataturf.fr</b></span>
      </Alert>
      </Grid>
    )}

<Grid item xs={12}>
          <ToggleButtonGroup
          size="small"
          value={this.state.date}
          exclusive
          onChange={this.handleDate}
          aria-label=""
          >
      <ToggleButton value="jour" aria-label="Aujourd'hui">
      <Tooltip arrow title={<h3>Programme du jour</h3>}>
        <TodayIcon fontSize="small" />
      </Tooltip>
      </ToggleButton>
      <ToggleButton value="demain" aria-label="Demain">
      <Tooltip arrow title={<h3>Programme de demain</h3>}>
        <EventIcon fontSize="small" />
      </Tooltip>
      </ToggleButton>
      
    </ToggleButtonGroup>
     <ToggleButtonGroup
          style={{marginLeft:"2em"}}
          size="small"
          exclusive
          aria-label=""
          >
      
     {/* <ToggleButton onClick={this.handleOuvrir} value="ouvrir" aria-label="Ouvrir">
      <Tooltip arrow title={<h3>Ouvrir une sélection</h3>}>
        <FolderOpenIcon fontSize="small" />
      </Tooltip>
    </ToggleButton>*/}
      <ToggleButton  onClick={this.handleEnregistrer} value="enregistrer" aria-label="Enregistrer">
      <Tooltip arrow title={<h3>Enregistrer la sélection</h3>}>
        <SaveIcon fontSize="small" />
      </Tooltip>
      </ToggleButton>

      { (this.state.filterBoxQueryToSearch == "" || this.state.filterBoxQueryToSearch.trim() === '' ) && (
      <ToggleButton disabled="true" onClick={this.handleDrawerOpenTest} value="tester" aria-label="Tester">
      <Tooltip arrow title={<h3>Tester la sélection</h3>}>
        <HistoryIcon fontSize="small" />
      </Tooltip>
      </ToggleButton>
      )}
      { (!this.state.filterBoxQueryToSearch.trim() == '') && (
      <ToggleButton onClick={this.handleDrawerOpenTest} value="tester" aria-label="Tester">
      <Tooltip arrow title={<h3>Tester la sélection</h3>}>
        <HistoryIcon fontSize="small" />
      </Tooltip>
      </ToggleButton>
      )}

      { (this.state.filterBoxQueryToSearch == "" || this.state.filterBoxQueryToSearch.trim() === '' ) && (
      <ToggleButton disabled="true" onClick={this.handleDrawerOpenAnalyse} value="analyser" aria-label="Analyser">
      <Tooltip arrow title={<h3>Profiler la sélection</h3>}>
        <CallSplitOutlinedIcon fontSize="small" />
      </Tooltip>
      </ToggleButton>
      )}
       { (!this.state.filterBoxQueryToSearch.trim() == '') && (
         <ToggleButton onClick={this.handleDrawerOpenAnalyse} value="analyser" aria-label="Analyser">
         <Tooltip arrow title={<h3>Profiler la sélection</h3>}>
           <CallSplitOutlinedIcon fontSize="small" />
         </Tooltip>
         </ToggleButton>
       )}

      <ToggleButton onClick={this.handleRecherche}  value="recherche" aria-label="Rechercher">
      <Tooltip arrow title={<h3>Exécuter la recherche</h3>}>
        <SearchIcon fontSize="small" />
      </Tooltip>
      </ToggleButton>
      
      { (this.state.loading == 1) && (
        <ToggleButton  value="recherche" aria-label="Rechercher">
        <CircularProgress size="20px" disableShrink />
        </ToggleButton>
      
    )}

    </ToggleButtonGroup>


      </Grid>

    <Grid style={{marginTop:"0.5em"}} item xs={12}>
      <ReactFilterBox className={this.classes.title}
              query={ this.state.filterBoxQuery.toString() }
              data={ data } 
              options={ rubriques }
              onChange={(query, result) => { this.ReactFilterBoxOnChange(query, result) }}
              //onParseError={() => {}
              //onParseOk={() => {}
        />
      
      </Grid>
    

    </Grid>

    </CardContent>
    </Card>
    </Container>

    { (this.state.openDialogEnregistrer == true) && (
      <DialogEnregistrer open={this.state.openDialogEnregistrer} onClose={this.handleCloseEnregistrer} notification={this.notificationEnregistrer} requete={this.state.filterBoxQueryToSearch} apiKey={this.state.apiKey} />
    )}
    { (this.state.openDialogOuvrir == true) && (
      <DialogOuvrir open={this.state.openDialogOuvrir} onClose={this.handleCloseOuvrir} apiKey={this.state.apiKey} choixSelection={this.selectionChoisie}/>
    )}
    { (this.state.openDialogTest == true) && (
      <DialogTest open={this.state.openDialogTest}  onClose={this.handleCloseTest} />
    )}
    

    { (this.state.showToastEnregistrerSuccess == 1) && (
      <Toast severity= 'success' message= 'Sélection enregistrée' callback = { () => this.setState( { showToastEnregistrerSuccess: 0 }) }></Toast>
    ) }

    <SwipeableDrawer
      anchor="right"
      open={this.state.openDrawer}
      onClose={this.handleDrawerClose}
      onOpen={this.handleDrawerOpen}
    >
      <div style={{width:"530px"}}>
        
          <ComposantFiche statsTrotteur={this.moreStatsTrotteur} statsDriver={this.moreStatsDriver} statsEntraineur={this.moreStatsEntraineur} date={this.state.date} apiKey = { this.props.apiKey } drawerClose={this.handleDrawerClose} trotteur={this.trotteurSelec} driver={this.driverSelec} hippodrome={this.hippodromeSelec} entraineur={this.entraineurSelec}/>  
        
      </div>
      
    </SwipeableDrawer>

    <SwipeableDrawer
      anchor="right"
      open={this.state.openDrawerTest}
      onClose={this.handleDrawerCloseTest}
      onOpen={this.handleDrawerOpenTest}
    >
      <div style={{width:"530px"}}>
        
          <ComposantTest apiKey = { this.props.apiKey } requete={this.state.filterBoxQueryToSearch} drawerCloseTest={this.handleDrawerCloseTest}/>  
        
      </div>
      
    </SwipeableDrawer>

    <SwipeableDrawer
      anchor="right"
      open={this.state.openDrawerAnalyse}
      onClose={this.handleDrawerCloseAnalyse}
      onOpen={this.handleDrawerOpenAnalyse}
    >
      <div style={{width:"630px"}}>
        
          <ComposantAnalyse apiKey = { this.props.apiKey } requete={this.state.filterBoxQueryToSearch} drawerCloseAnalyse={this.handleDrawerCloseAnalyse}/>  
        
      </div>
      
    </SwipeableDrawer>

    <SwipeableDrawer
      anchor="right"
      open={this.state.openDrawerStatsTrotteur}
      onClose={this.handleDrawerCloseStatsTrotteur}
      onOpen={this.handleDrawerOpenStatsTrotteur}
    >
      <div style={{width:"900px"}}>
        
          <ComposantStatsTrotteur  date={this.state.date} apiKey = { this.props.apiKey } drawerClose={this.handleDrawerCloseStatsTrotteur} trotteur={this.trotteurSelec} />  
        
      </div>
      
    </SwipeableDrawer>

    <SwipeableDrawer
      anchor="right"
      open={this.state.openDrawerStatsDriver}
      onClose={this.handleDrawerCloseStatsDriver}
      onOpen={this.handleDrawerOpenStatsDriver}
    >
      <div style={{width:"900px"}}>
        
          <ComposantStatsDriver  date={this.state.date} apiKey = { this.props.apiKey } drawerClose={this.handleDrawerCloseStatsDriver} driver={this.driverSelec} />  
        
      </div>
      
    </SwipeableDrawer>


    <SwipeableDrawer
      anchor="right"
      open={this.state.openDrawerStatsEntraineur}
      onClose={this.handleDrawerCloseStatsEntraineur}
      onOpen={this.handleDrawerOpenStatsEntraineur}
    >
      <div style={{width:"900px"}}>
        
          <ComposantStatsEntraineur  date={this.state.date} apiKey = { this.props.apiKey } drawerClose={this.handleDrawerCloseStatsDriver} entraineur={this.entraineurSelec} />  
        
      </div>
      
    </SwipeableDrawer>


    </div>



  )}
}

export default PageScreener;