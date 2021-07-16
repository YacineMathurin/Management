import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import PageRechercherWithSplitPane from '../PageRechercherWithSplitPane';



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
      marginLeft: 20,
      flexGrow: 1,
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
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      marginTop: '5em',
      // padding: theme.spacing(3),
    },
  }),
);

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  // variable for the drawer
  const [open, setOpen] = React.useState(false);
  // showTableParis = true > show TableParis else show TableSelection
  // click on one TableSelection row to go to showTableParis
  const [showTableParis, setShowTableParis] = React.useState(false);
  // dataTableParis = data passed from TableSelection to TableParis
  const [dataTableParis, setDataTableParis] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const callbackSelectionTable = (data) => {
    console.log('callback from SelectionTable : data = ' + data)
    (showTableParis ? setShowTableParis(false) : setShowTableParis(true));
    setDataTableParis(data);
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
         
          <img width='75' src={"./images/logo3.png"}></img>
          <Typography variant="h6" className={classes.title}>
      Trotstats référentiel
    </Typography>
    

        </Toolbar>
      </AppBar>
    
      <main className={classes.content}>
      
      <PageRechercherWithSplitPane/> 
      
      </main>
    </div>
  );
}
