import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TestExpendableTable from './TestExpendableTable'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const retour = () => {
  alert('retour ne fonctionne pas pour le moment')
}

export default function PageTopSelections(props) {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
    
      <Container style={{marginTop:'5em', minWidth:'950px', maxWidth:'950px', backgroundColor: '#FAFBFC',height: '100%' }}>
      <IconButton  color="primary" >
        <ArrowBackIcon onClick={() => retour() }/> retour
      </IconButton >

      <div style={{width:'900px'}}>
        <TestExpendableTable/>
      </div>
      </Container>
    </div>
  );
}
