import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
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
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import { TableRow, TableCell } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';

class PageBibliotheque extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: this.props.apiKey,
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

  handleCourseChange(event) {
    this.setState( { courseSelected:  event.target.value })  
    this.courseSelection = event.target.value;
    this.setState({ listeSynthese: null})
    this.provideBiblio();
  }

  handleDatePronostics = (e) => {
    var date = e.toLocaleDateString("fr-FR");
    this.dateSelection = date;
    this.state.listCourses = null;
    this.courseSelection = ""
    this.provideBiblio();
  }

 
 

 

  render() {
  return (
    <div className={this.classes.root}>
       <Grid container spacing={2}>
       
        <Grid item xs={8}>
        <Card>
          <CardHeader
            avatar={
              <img width="38" src="./images/log-format.svg"/>
            }
            
            title="Journaux techniques"
            subheader="Logs et traces techniques"
          />
            <CardContent>
              <Table>
              <TableHead>
                <TableRow>
                <TableCell>Date</TableCell>
                <TableCell >Cobot</TableCell>
                <TableCell>Type</TableCell>
                <TableCell >Action / Trace</TableCell>
                </TableRow>
              </TableHead>
              <TableRow>
                  <TableCell>17/11/2020 - 14h38</TableCell>
                  <TableCell>COBOT-30_001</TableCell>
                  <TableCell>LOG DÉVELOPPEUR</TableCell>
                  <TableCell>PRINTF(format,Expr1,Expr2, ... )</TableCell>
                </TableRow>
              <TableRow></TableRow>
              <TableRow>
                  <TableCell>17/11/2020 - 14h38</TableCell>
                  <TableCell>COBOT-30_001</TableCell>
                  <TableCell>COBOT</TableCell>
                  <TableCell>VÉRIFICATION BATTERIE</TableCell>
                </TableRow>
              <TableRow>
                  <TableCell>17/11/2020 - 14h37</TableCell>
                  <TableCell>COBOT-100_001</TableCell>
                  <TableCell>COBOT</TableCell>
                  <TableCell>INITIALISATION</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>17/11/2020 - 14h35</TableCell>
                  <TableCell>COBOT-100_002</TableCell>
                  <TableCell>COBOT</TableCell>
                  <TableCell>RESTART</TableCell>
                </TableRow>
              </Table>

            <a href="http://localhost:3000/datalogs.csv" target="_blank">
              <Button
                 style={{marginTop:"1em"}}
                 fullWidth="true"
                 variant="contained"
                   color="primary"
                   size="small"
                 >
                   Télécharger le fichier
                 </Button>
                 </a>

            </CardContent>
          </Card>  
        </Grid>

         <Grid item xs={4}>
        <Card>
          <CardHeader
            avatar={
              <TuneOutlinedIcon fontSize="large"/>   
            }
            
            title="Filtrage"
            subheader="Filtrer les journaux"
          />
            <CardContent>
              <div style={{marginBottom:"1.5em"}}>
            <DatePickerPronostics callbackHandleDatePronostics={this.handleDatePronostics}/>  
            </div>
            <FormControl size="small" fullWidth="true" variant="outlined">
        <InputLabel>Cobot</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.chronoSelected}
          labelWidth={45}
          fullWidth="true"
          onChange={this.handleChronoChange}
        >
        <MenuItem  value="TOTAL">COBOT-30_001</MenuItem>
        <MenuItem  value="RK">COBOT-30_002</MenuItem>
        <MenuItem  value="RK">COBOT-100_001</MenuItem>
        </Select>
        </FormControl>

        <FormControl style={{marginTop:"1em"}} size="small" fullWidth="true" variant="outlined">
        <InputLabel>Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.chronoSelected}
          labelWidth={40}
          fullWidth="true"
          onChange={this.handleChronoChange}
        >
        <MenuItem  value="TOTAL">COBOT</MenuItem>
        <MenuItem  value="RK">LOG DÉVELOPPEUR</MenuItem>
        
        </Select>
        </FormControl>

        <FormControl style={{marginTop:"1em"}} size="small" fullWidth="true" variant="outlined">
        <InputLabel>Action</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.chronoSelected}
          labelWidth={45}
          fullWidth="true"
          onChange={this.handleChronoChange}
        >
        <MenuItem  value="TOTAL">START</MenuItem>
        <MenuItem  value="RK">RESTART</MenuItem>
        <MenuItem  value="RK">INITIALISATION</MenuItem>
        
        </Select>
        </FormControl>
      
 <Button
                 style={{marginTop:"1em"}}
                 fullWidth="true"
                 variant="contained"
                   color="primary"
                   size="small"
                 >
                   Filtrer
                 </Button>


            </CardContent>
          </Card>  
        </Grid>

      </Grid>
    </div>
  )}
}

export default PageBibliotheque;