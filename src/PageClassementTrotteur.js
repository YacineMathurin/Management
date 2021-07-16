import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import TableClassementTrotteur from './TableClassementTrotteur';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DatePickerPronostics from './DatePickerPronostics';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as Const from './Constant';


class PageClassementTrotteur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: this.props.apiKey,
      synthese : null,
      dateSelected : new Date(),
      courseSelected : '',
      listCourses : null
    }
    this.handleCourseChange = this.handleCourseChange.bind(this);
    var dateSelection = "";
    var courseSelection = "";
  }

  classes = makeStyles((theme: Theme) =>
  createStyles({
   }),
  );

  callbackToRecherche = (date, data) => {
    this.props.callbackToRecherche(date, data)
  } 

  handleCallbackViewEdit = (data) => {
    this.props.callbackViewEdit(data)
  }

  handleCallbackFilterChange = (data) => {
    this.setState( { dataTableSynthese: data })
  }

  handleDatePronostics = (e) => {
    var date = e.toLocaleDateString("fr-FR");
    this.dateSelection = date;
    this.state.listCourses = null;
    this.courseSelection = ""
    this.updateTable()
   
  }

  handleCourseChange(event) {
    this.setState( { courseSelected:  event.target.value })  
    this.courseSelection = event.target.value;
    this.updateTable();
  }

  componentDidMount() {
    var date = this.state.dateSelected;
    date = date.toLocaleDateString("fr-FR");
    this.dateSelection = date;
    
    fetch(Const.URL_WS_SYNTHESE + `?token=${this.state.apiKey}&date=${date}&course=${this.courseSelection}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ synthese: data})
        this.provideListCourses();
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })    
  }
  
  provideListCourses(){
    
    fetch(Const.URL_PROVIDE_COURSES + `?token=${this.state.apiKey}&date=${this.dateSelection}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ listCourses: data})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }

  updateTable(){
    fetch(Const.URL_WS_SYNTHESE + `?token=${this.state.apiKey}&date=${this.dateSelection}&course=${this.courseSelection}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
      this.setState({ synthese: data})
      this.provideListCourses()
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }

  render() {
  return (
    <div className={this.classes.root}>

    {/* Section recherche  */}
     <Container style={{minWidth:'950px', maxWidth:'950px', backgroundColor: '#FAFBFC',height: '100%' }}>

    
    <Card>
      <CardContent>
      <Typography color="textSecondary" gutterBottom variant="h5" style={{color:"#454E54", lineHeight:"0.5em"}}>Les trotteurs repérés</Typography>
      <div style={{marginTop:"1em"}}></div>
      <Typography color="textSecondary" gutterBottom variant="body1">Retrouvez les pronostics du jour et du lendemain.</Typography>
      
      <Grid style={{marginTop:'1em'}} container spacing={3}>
        <Grid item xs={6}>
        <DatePickerPronostics callbackHandleDatePronostics={this.handleDatePronostics}/>
        </Grid>

        <Grid item xs={6}>
        
        
        </Grid>

        <Grid item xs={10}>
        <FormControl variant="outlined">
        <InputLabel>Course</InputLabel>
        
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.courseSelected}
          labelWidth={50}
          style={{width:"870px"}}
          onChange={this.handleCourseChange}
        >
        <MenuItem value="">TOUTES LES COURSES</MenuItem>
          { (this.state.listCourses != null) && ( this.state.listCourses.map((course) => {
          return ( <MenuItem value={course}>{course}</MenuItem>);
          })) }
          { (this.state.listCourses == null) && (<center><CircularProgress disableShrink /></center>) }
          
        </Select>
        
        
        </FormControl>
        </Grid>
      
      </Grid>
      
      <Grid style={{marginTop:'1em'}} container spacing={3}>
      <Grid item xs={12}>
      { (this.state.synthese != null ) && (
        <TableClassementTrotteur apiKey = { this.props.apiKey } synthese = {this.state.synthese} callbackNeedToLogin = { this.props.callbackNeedToLogin } callbackToRecherche = { this.callbackToRecherche }></TableClassementTrotteur>      
      )}
     
      </Grid>
    <Grid item xs={12}>
    <Alert severity="info">Pronostics du jour et du lendemain calculés par notre algorithme de performance.</Alert>
    </Grid>
    </Grid>
    </CardContent>
    </Card>
    </Container>
    </div>
  )}
}

export default PageClassementTrotteur;