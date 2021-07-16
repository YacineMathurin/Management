import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import React, { useState } from 'react';
import Async from "react-async";

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.dataturf.fr/">
        Dataturf - L'appli des pros 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function test(){
  alert("test");
}


const loadKeyApi = async ({ user }, { pass }) => {
    //user = 'demo@dataturf.fr'
    //pass = 'timoko'
    const res = await fetch(`http://vps-17d340a0.vps.ovh.net:8080/authWS?email=${user}&password=${pass}`, { retry: 3, retryDelay: 1000})
    if (!res.ok) throw new Error('error')
    console.log(res)
    return res.json()
}

export default function DemandeComptePage(props) {
  const classes = useStyles();

  const [checkPassword, setCheckPassword] = useState(false);
  const [apiKey, setApiKey] = useState('000');

  function wantToCheckPassword() {
    if (checkPassword) setCheckPassword(false)
    else setCheckPassword(true)
    }

  return (
    <Container component="main" style={{width:"450px", backgroundColor: 'white', height: '85%'}}>
      <CssBaseline />
      <AppBar position="fixed">
      <Toolbar>
        <img width='75' src={"./images/logo3.png"}></img>
        <Typography variant="h6" className={classes.title}></Typography>
      </Toolbar>
      </AppBar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <HowToRegIcon />
        </Avatar>
        {/*<Typography component="h1" variant="h5">
          Authentification
        </Typography>*/}
       <div style={{marginTop:"1em"}}>
       <i>
        <span>Testez gratuitement pendant 24 heures !</span>
        <div style={{marginTop:"0.5em"}}>
        <span>Créez votre compte en quelques secondes.</span></div><div><span>C'est gratuit, sans engagement et pas de carte bancaire.</span>
        </div>
        </i>
        </div>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            type="password"
            fullWidth
            id="password"
            label="Mot de passe"
            name="password"
            autoComplete="password"
            autoFocus
          />
         
          <div>
          <center><span>Déjà <Link href="#" variant="body2">
                {"inscrit"}
              </Link> ?</span></center>
          </div>
          <div style={{marginTop:"0.5em"}}>
          <center><span> </span></center>
          <center><span>L'activation de votre accès gratuit est automatique.</span></center>
          <center><span>Profitez dès maintenant du logiciel en ligne <i>Trotstats</i>.</span></center>
            </div>
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<KeyboardArrowRightIcon />}
            className={classes.submit}
            onClick={() => { wantToCheckPassword() }}
          >
            Activez votre accès gratuit
          </Button>
          { checkPassword && ( 
            <Async promiseFn={loadKeyApi} user={'hello'} pass={'pass'}>
            {({ data, error, isPending }) => {
                if (isPending) return (<center><CircularProgress disableShrink /></center>)
                if (error) return (<div>"Incorrect password..."</div>)
                if (data) {
                    setApiKey(data.serial)
                    setCheckPassword(false)
                    console.log(data.serial)
                    console.log(data)
                    props.callbackFunction(data.serial)
                 }
                return null
            }}
          </Async>) }
          
        </form>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
}
