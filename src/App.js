import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import LockIcon from '@material-ui/icons/Lock';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import clsx from 'clsx';
import React from 'react';
import LoginPage from './LoginPage';
import PageScreener from './PageScreener';
import PageClassementTrotteur from './PageClassementTrotteur';
import PageDetailsSelection from './PageDetailsSelection';
import PageEcartFavoris from './PageEcartFavoris';
import PageMonDossier from './PageMonDossier';
import PageRechercheSelections from './PageRechercheSelections';
import PageStatsTrotteurs from './PageStatsTrotteurs';
import PageAdministration from './PageAdministration';
import PageAide from './PageAide';
import PageBibliotheque from './PageBibliotheque';
import StorageIcon from '@material-ui/icons/Storage';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import Toast from './Toast';
import PageTableauDeBord from './PageTableauDeBord';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import PageTopChrono from './PageTopChrono';
import PageMaps from './PageMaps';
import MapGestion from './MapGestion';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentRight: {
    cursor: 'pointer',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'flex-end'
  },
}));

export default function MiniDrawer() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [openDialogProfil, setOpenDialogProfil] = React.useState(false)
  const [apiKey, setApiKey] = React.useState(null)
  const [dateFinAbonnement, setDateFinAbonnement] = React.useState(null)
  const [showDetailsSelection, setShowDetailsSelection] = React.useState(-1)
  const [showDetailsMetrics, setShowDetailsMetrics] = React.useState(-1)
  const [showDetailsMaps, setShowDetailsMaps] = React.useState(-1)
  const [showDetailsMapGestion, setShowDetailsMapGestion] = React.useState(-1)
  const [showClassementTrotteur, setShowClassementTrotteur] = React.useState(-1)
  const [showRechercheSelections, setShowRechercheSelections] = React.useState(-1) 
  const [showEcartFavoris, setShowEcartFavoris] = React.useState(-1)
  const [showStatsTrotteurs, setShowStatsTrotteurs] = React.useState(-1)
  const [showMonDossier, setShowMonDossier] = React.useState(-1)
  const [showAdmin, setShowAdmin] = React.useState(-1)
  const [showToastLogout, setShowToastLogout] = React.useState(-1)
  const [showToastLoginOK, setShowToastLoginOK] = React.useState(-1)
  const [showAide, setShowAide] = React.useState(-1)
  const [showMaps, setShowMaps] = React.useState(-1)
  const [showMapGestion, setMapGestion] = React.useState(-1)
  const [showScreener, setShowScreener] = React.useState(-1)
  const [showBiblio, setShowBiblio] = React.useState(-1)
  const [showTableauDeBord, setShowTableauDeBord] = React.useState(1) // default screen

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const handleDialogProfilOpen = () => {
    setOpenDialogProfil(true);
  }

  const handleDialogProfilClose = () => {
    setOpenDialogProfil(false);
  }

  const handleCallbackLogin = (data, dateFinAbonnement) => {
    console.log('callback : data = ' + data + " " + dateFinAbonnement)
    setShowToastLoginOK(1)
    setApiKey(data)
    setDateFinAbonnement(dateFinAbonnement)
  }

  const handleCallbackDetails = (data) => {
    console.log('callback details wants to view = ' + data)
    // data is the index of the selection to view
    setShowDetailsSelection(data)
    setShowRechercheSelections(-1)
    setShowClassementTrotteur(-1)
  }

  const handleCallbackOpenDetails = (data) => {
    setShowDetailsMetrics(data)
    setShowTableauDeBord(-1)
    setShowAide(1)
  }
  const handleCallbackOpenMaps = (data) => {
    setShowDetailsMaps(data)
    setShowTableauDeBord(-1)
    setShowDetailsMapGestion(-1)
    setShowMaps(1)
    setMapGestion(-1)
  }
  
  const handleCallbackOpenMapGestion = (data)=>{
    console.log('on y va a mapGestion')
    setShowDetailsMapGestion(data)
    setShowTableauDeBord(-1)
    setShowMaps(-1)
    setMapGestion(1)
  }

  const handleCallbackRetourDetails = (data) => {
    console.log('user wants to return to selection trotteur / main page')
    // retour de la page vue Details
    // si data != null then we need to go to edit (data = requete to edit)
    if (data != null) {
      localStorage.setItem("lastQuery", data);
      setShowRechercheSelections(-1)
      setShowStatsTrotteurs(-1)
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowMonDossier(-1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowBiblio(-1)
      setShowScreener(1)
      setShowTableauDeBord(-1)
    } else {
      setShowRechercheSelections(-1)
      setShowDetailsSelection(-1)
      setShowStatsTrotteurs(-1)
      setShowMonDossier(1)
      setShowClassementTrotteur(-1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowBiblio(-1)
      setShowScreener(-1)
      setShowTableauDeBord(-1)
    }
  }

  const callBackToRecherche = (date, data) => {
    if(date == "AUJOURD'HUI"){
      date = "jour"
    }else if(date == "DEMAIN"){
      date = "demain"
    }
    // retour de la page vue Details
    // si data != null then we need to go to edit (data = requete to edit)
    if (data != null) {
      localStorage.setItem("lastQuery", data);
      localStorage.setItem("date", date);
      setShowRechercheSelections(-1)
      setShowStatsTrotteurs(-1)
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowMonDossier(-1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowBiblio(-1)
      setShowScreener(1)
      setShowTableauDeBord(-1)
    } else {
      setShowRechercheSelections(-1)
      setShowDetailsSelection(-1)
      setShowStatsTrotteurs(-1)
      setShowMonDossier(1)
      setShowClassementTrotteur(-1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowBiblio(-1)
      setShowScreener(-1)
      setShowTableauDeBord(-1)
    }
  }

  const drawerButtonClicked = (name, index) => {
    if (name.includes('Éditeur')) {  // dashboard2
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowRechercheSelections(1)
      setShowEcartFavoris(-1)
      setShowStatsTrotteurs(-1)
      setShowMonDossier(-1)
      setShowAdmin(-1)
      setShowBiblio(-1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowScreener(-1)
      setShowTableauDeBord(-1)
    }
    else if (name.includes('Trotteur')) { // Rapport trotteur
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(1)
      setShowRechercheSelections(-1)
      setShowEcartFavoris(-1)
      setShowStatsTrotteurs(-1)
      setShowMonDossier(-1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowBiblio(-1)
      setShowScreener(-1)
      setShowTableauDeBord(-1)
    }
    else if (name.includes('Écarts')) { // Rapport Favori
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowRechercheSelections(-1)
      setShowStatsTrotteurs(-1)
      setShowEcartFavoris(1)
      setShowBiblio(-1)
      setShowMonDossier(-1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowScreener(-1)
      setShowTableauDeBord(-1)
    }
    else if (name.includes('Statistiques')) { // Statistiques Trotteurs
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowRechercheSelections(-1)
      setShowEcartFavoris(-1)
      setShowMonDossier(-1)
      setShowStatsTrotteurs(1)
      setShowBiblio(-1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowScreener(-1)
      setShowTableauDeBord(-1)
    }
    else if (name.includes('Mes')) { // Statistiques Trotteurs
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowRechercheSelections(-1)
      setShowEcartFavoris(-1)
      setShowStatsTrotteurs(-1)
      setShowBiblio(-1)
      setShowMonDossier(1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowScreener(-1)
      setShowTableauDeBord(-1)
    }
    else if (name.includes('Mise à jour')) { // Administration
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowRechercheSelections(-1)
      setShowEcartFavoris(-1)
      setShowBiblio(-1)
      setShowStatsTrotteurs(-1)
      setShowMonDossier(-1)
      setShowAdmin(1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowScreener(-1)
      setShowTableauDeBord(-1)
    }
    else if (name.includes('Aide')) { // Aide
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowRechercheSelections(-1)
      setShowEcartFavoris(-1)
      setShowBiblio(-1)
      setShowStatsTrotteurs(-1)
      setShowMonDossier(-1)
      setShowAdmin(-1)
      setShowAide(1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowScreener(-1)
      setShowTableauDeBord(-1)
    }
    else if (name.includes('Screener')) { // Screener
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowRechercheSelections(-1)
      setShowBiblio(-1)
      setShowEcartFavoris(-1)
      setShowStatsTrotteurs(-1)
      setShowMonDossier(-1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowScreener(1)
      setShowTableauDeBord(-1)
    }
    else if (name.includes('Biblio')) { // Biblio
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowRechercheSelections(-1)
      setShowEcartFavoris(-1)
      setShowStatsTrotteurs(-1)
      setShowMonDossier(-1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowScreener(-1)
      setShowBiblio(1)
      setShowTableauDeBord(-1)
    }
    else if (name.includes('tableau')) { // Tableau de bord
      setShowDetailsSelection(-1)
      setShowClassementTrotteur(-1)
      setShowRechercheSelections(-1)
      setShowEcartFavoris(-1)
      setShowStatsTrotteurs(-1)
      setShowMonDossier(-1)
      setShowAdmin(-1)
      setShowAide(-1)
      setShowMaps(-1)
      setMapGestion(-1)
      setShowScreener(-1)
      setShowBiblio(-1)
      setShowTableauDeBord(1)
    }

  }

  const logout = () => {
    // delte username then display page login
    setShowToastLogout(1)
    /*localStorage.removeItem('username')
    localStorage.removeItem('password')*/
    localStorage.clear();

    handleCallbackNeedToLogin()
    handleDrawerClose()
  }

  const handleCallbackNeedToLogin = () => {
    setApiKey(null)
    setShowAide(-1)
    setShowMaps(-1)
    setMapGestion(-1)
    setShowTableauDeBord(1)
  }

  const handleRetourMaps = () => {
    setShowAide(-1)
    setShowMaps(1)
    setMapGestion(-1)
    setShowTableauDeBord(-1)
  }

  return (

  <div className={classes.root}>

      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        { (apiKey != null) && ( // if login page no drawer
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
          <MenuIcon /> 
          </IconButton> )}
          <Typography style={{color:"WHITE"}} component="h1" variant="h5">
          QENVI ROBOTICS
        </Typography>
          
         
          
         
          {/* Text  */}
          { (apiKey != null) && (
          <div className={clsx(classes.contentRight)}>
          <Typography variant="h6" noWrap>
          { localStorage.getItem('username') ? localStorage.getItem('username').split('@')[0] : '' }
          </Typography></div> )}
         
          {/* Icon login or not */}
           { (apiKey == null) && ( <div className={clsx(classes.contentRight)}><IconButton
            color="inherit"
            edge="end"
            >
            <LockIcon /> 
          </IconButton></div>)}
          { (apiKey != null) && (<div style={{marginRight:"2em"}}><IconButton
            color="inherit"
            edge="end">
            <FaceIcon /> 
          </IconButton></div> )}
         
          {/* Icon logout */}
          { (apiKey != null) && (<div><IconButton
            color="inherit"
            onClick={logout}
            edge="end">
            <ExitToAppIcon /> 
          </IconButton></div>)}
        </Toolbar>
      </AppBar>
      { (apiKey != null) && (
      <Drawer
        width="600px"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        
            <ListItem button onClick={() => {drawerButtonClicked("tableau", 1)} }>
              <ListItemIcon><DashboardOutlinedIcon/></ListItemIcon>
              <ListItemText primary="Tableau de bord"></ListItemText>
            </ListItem>
            <Divider />
            <ListItem button onClick={() => {drawerButtonClicked("Biblio", 1)} }>
              <ListItemIcon><img width="22" height="22" src="./images/wrench.svg"/></ListItemIcon>
              <ListItemText primary="Journaux"></ListItemText>
            </ListItem>
      
        </List>
        
      </Drawer> ) }
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* for the toast the callback reset the variable that displays the toast */}
        { (showToastLogout == 1) && (<Toast severity= 'success' message= 'Vous êtes déconnecté' callback = { () => setShowToastLogout(-1) }></Toast>) }
        { (showToastLoginOK == 1) && (<Toast severity= 'success' message= 'Connexion réussie' callback = { () => setShowToastLoginOK(-1) }></Toast>) }

        { (apiKey == null) && (<LoginPage callbackFunction = { handleCallbackLogin }/>) } 
        { (showRechercheSelections > -1) && (apiKey != null) && (<PageRechercheSelections callbackNeedToLogin = { handleCallbackNeedToLogin } callbackViewDetails = { handleCallbackDetails } apiKey = { apiKey }/>) } 
        { (showDetailsSelection > -1) && (apiKey != null) && (<PageDetailsSelection callbackNeedToLogin = { handleCallbackNeedToLogin } callbackRetourDetails = { handleCallbackRetourDetails } apiKey = { apiKey } showDetailsSelection = { showDetailsSelection }/>) } 
        {/* { (editDetailsSelection > -1) && (apiKey != null) && (<PageRechercheSelection callbackRetourDetails = { handleCallbackRetourDetails } apiKey = { apiKey } editDetailsSelection = { editDetailsSelection }/>) }  */}
        { (showClassementTrotteur > -1) && (apiKey != null) && (<PageClassementTrotteur callbackNeedToLogin = { handleCallbackNeedToLogin } apiKey = { apiKey } callbackToRecherche = { callBackToRecherche } callbackRetourDetails = { handleCallbackRetourDetails } />) } 
        { (showEcartFavoris > -1) && (apiKey != null) && (<PageEcartFavoris callbackNeedToLogin = { handleCallbackNeedToLogin } apiKey = { apiKey } callbackViewDetails = { handleCallbackDetails } />) }
        { (showStatsTrotteurs > -1) && (apiKey != null) && (<PageStatsTrotteurs callbackNeedToLogin = { handleCallbackNeedToLogin } apiKey = { apiKey } callbackViewDetails = { handleCallbackDetails } />) }
        { (showMonDossier > -1) && (apiKey != null) && (<PageMonDossier callbackNeedToLogin = { handleCallbackNeedToLogin } apiKey = { apiKey } callbackViewDetails = { handleCallbackDetails } callbackRetourDetails = { handleCallbackRetourDetails } />) }
        { (showAdmin > -1) && (apiKey != null) && (<PageAdministration callbackNeedToLogin = { handleCallbackNeedToLogin } apiKey = { apiKey } />) } {/* pas besoinde callback - pas de bouton de retour */}
        { (showAide > -1) && (apiKey != null) && (<PageAide callbackNeedToLogin = { handleCallbackNeedToLogin } apiKey = { apiKey } showDetailsMetrics = { showDetailsMetrics } />) } {/* pas besoinde callback - pas de bouton de retour */}
        { (showMaps > -1) && (apiKey != null) && (<PageMaps callbackNeedToLogin = { handleCallbackNeedToLogin } apiKey = { apiKey } showDetailsMaps = { showDetailsMaps } callbackOpenMapGestion = {handleCallbackOpenMapGestion}/>) } {/* pas besoinde callback - pas de bouton de retour */}
        { (showMapGestion > -1) && (apiKey != null) && (<MapGestion callbackNeedToLogin = { handleCallbackNeedToLogin } callBackRetourMaps={ handleRetourMaps }  apiKey = { apiKey } showDetailsMapGestion = { showDetailsMapGestion } />) } {/* pas besoinde callback - pas de bouton de retour */}
        { (showScreener > -1) && (apiKey != null) && (<PageTopChrono callbackNeedToLogin = { handleCallbackNeedToLogin } apiKey = { apiKey } />) } {/* pas besoinde callback - pas de bouton de retour */}
        { (showBiblio > -1) && (apiKey != null) && (<PageBibliotheque callbackNeedToLogin = { handleCallbackNeedToLogin } apiKey = { apiKey } callbackRetourDetails = { handleCallbackRetourDetails } />) } {/* pas besoinde callback - pas de bouton de retour */}
        { (showTableauDeBord > -1) && (apiKey != null) && (<PageTableauDeBord callbackNeedToLogin = { handleCallbackNeedToLogin } apiKey = { apiKey } callbackOpenDetails = {handleCallbackOpenDetails} callbackOpenMaps = {handleCallbackOpenMaps} callbackRetourDetails = { handleCallbackRetourDetails } />) } {/* pas besoinde callback - pas de bouton de retour */}
      </main>
    </div>
  );
}
