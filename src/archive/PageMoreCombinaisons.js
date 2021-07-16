import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import TablePariHistorique from './TablePariHistorique';
import TablePronostics from './TablePronostics';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwitchT from '@material-ui/core/Switch';
import TimelineIcon from '@material-ui/icons/Timeline';
import BarChartIcon from '@material-ui/icons/BarChart';
import TestBarChart from './TestBarChart'
import TestLineChart from './TestLineChart'
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

class PageMoreCombinaisons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      requeteOrigin: this.props.requete,
      apiKey: this.props.apiKey,
      subRequete: null
    }
    
  }
  
  componentDidMount() {
    this.findAllSubRequest(this.props.requete)
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
  
  findAllSubRequest(requete) {
    console.log('-- findAllSubRequest --')
    var len, index, i, k, j
    len = requete.length
    console.log(len)
    var arraytest = ['0','1','2','3','4','5','6','7','8','9']
    //len = arraytest.length
    len = requete.length
    var permutations = new Set()
    for (var num=0; num < len; num++) {
    console.log('--- num ' + num)
    for (index=0; index < len; index++) {
      for (i=0; i < len; i++) {
        var tmp = arraytest[index]
        for (j=0; j < num; j++) {
          console.log('>> ' + index + ' ' + i+j)
          if (index!=i+j) {
            tmp = tmp + arraytest[i+j]
            console.log('>> ' + tmp)
          }
        }
        //console.log(tmp)
        if (tmp.length == num + 1) {
          // save sorted string to avoid duplicates
          permutations.add(tmp.split('').sort().join())
          console.log(tmp)
          //permutations.add(tmp)
        }
        }
      }
      var final = []
      for (let item0 of permutations) {
          console.log('FROM ' + item0)
          var item = item0.replace(/,/g,'')
          console.log('TO ' + item)
          console.log('considering item : ' + item)
          console.log('picking up :' + item[0])
          
          var tmp = requete[item[0]].critere
          console.log('got ' + tmp)
          console.log('longueur item : ' + item.length)
          for (var l=1; l<item.length; l++) {
            console.log('collecting inner item ' + item[l])
            try {
              tmp = tmp + ',' + requete[item[l]].critere
            } catch(err) {
              console.log('error with index' + item[l])
            }
          }
          final.push(tmp)
      }  
    }
    this.setState({ subRequete : final }) 
  }

  render() {
  return (
  <div className={this.classes.root}>
      <CssBaseline />
      <Container style={{ minWidth:'950px', maxWidth:'950px', backgroundColor: '#FAFBFC',height: '100%' }}>
      {/* Section display critere */}
      <div style={{width:'900px', marginTop:"0.5em"}}>
        <Card style={{width:'100%'}}>
          <CardContent>
            <Typography className={this.classes.title} color="textSecondary" gutterBottom>
              Similaires sélections
            </Typography>
            {/* { this.state.detail.critere } */}
            <div style={{marginTop:"1em"}}>
              { (this.state.subRequete != null) && ( 
                  this.state.subRequete.map((value) =>
                  <Chip label={value} color="primary" style={{marginRight:"0.5em", marginBottom:"0.5em"}} /> )) }
            </div>
          </CardContent>
        </Card>
      </div>
    </Container></div>
    )}
}

export default PageMoreCombinaisons;