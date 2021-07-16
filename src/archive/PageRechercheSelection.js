import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwitchT from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableSyntheseSelection from './TableSyntheseSelection'
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import data from './data/data'
import { configReactFilterBox } from './config/configReactFilterBox'

class PageRechercheSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTableSynthese : null,
      filterBoxQuery : '',
      filterBoxQueryStatus : 'ok',
    }
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

   handleCallbackViewDetails = (data) => {
    this.props.callbackViewDetails(data)
  } 

  handleCallbackViewEdit = (data) => {
    console.log('>>> ', data)
  }

  handleCallbackFilterChange = (data) => {
    this.setState( { dataTableSynthese: data })
  }

  ReactFilterBoxOnParseOk = () => { 
    //console.log('Parse Ok')
    this.setState( { filterBoxQueryStatus: 'ok' })
  }
  
  ReactFilterBoxOnChange = (query, result) => {
    // make sure the box text and query are in sync
    this.setState( { filterBoxQuery: query })
  }
  
  ReactFilterBoxOnParseError = () => {
    //console.log('Parse Error')
    this.setState( { filterBoxQueryStatus: 'error' })
  }

  getFilterBoxQuery = () => {
    // do search requestRecherche();
  }

  resetRecherche = async () => {
    // const response = await fetch(`http://vps-17d340a0.vps.ovh.net:8080/tableSelectionsWS?token=${props.apiKey}`);
    // const json = await response.json();
    // if (json.table.length > 0){
    //   alert("Afficher la liste des bests selection , tableSelectionsWS , dans le tableau")
    // }
    // yoyo
  }

  render() {
    console.log('start page recherche selection')
  return (
    <div className={this.classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
      <Toolbar>
        <img width='75' src={"./logo3.png"}></img>
        <Typography variant="h6" className={this.classes.title}></Typography>
      </Toolbar>
      </AppBar>
    
    {/* Section recherche  */}

      <Container style={{minWidth:'950px', maxWidth:'950px', backgroundColor: '#FAFBFC',height: '100%' }}>
      
      
      
      
      <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
      <Typography className={this.classes.heading}>Filtrer les sélections</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails> 
      <div style={{width:'100%'}}>
      {/* <ReactFilterBox className={this.classes.title}
        query={ this.state.filterBoxQuery.toString() }
        data={ data } 
        options={ configReactFilterBox.options }
        onParseOk={() => { this.ReactFilterBoxOnParseOk() }}
        onChange={(query, result) => { this.ReactFilterBoxOnChange(query, result) }}
        onParseError={() => { this.ReactFilterBoxOnParseError() }}
        /> */}</div> 
     <FormGroup row style={{float:'left'}}>
      <FormControlLabel
        control={
          //<SwitchT checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA"/>
          <SwitchT></SwitchT>
        }
        label="recherche étendue"
      />
      </FormGroup>
      <Fab onClick={() => { this.getFilterBoxQuery() }} style={{float:'right',marginBottom:'1em', marginLeft:'1em'}} color="primary" aria-label="Search">
        <SearchIcon />
      </Fab>
      <Fab  onClick={() => { this.setState( { filterBoxQuery: '' }); this.resetRecherche() }} style={{float:'right',marginBottom:'1em', marginLeft:'0em'}} color="secondary" aria-label="Search">
        <ClearIcon />
      </Fab>
      </ExpansionPanelDetails>
      </ExpansionPanel>
         
    {/* Section selection  */}

      <div style={{width:'886px', marginTop:'10px'}}>
      <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={this.classes.heading}>Sélection(s) trouvée(s)</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <TableSyntheseSelection data = { this.state.dataTableSynthese } callbackFunctionEdit = { this.handleCallbackViewEdit } callbackFunctionDetails = { this.handleCallbackViewDetails }/>
      </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>

      </Container>
    </div>
  )}
}

export default PageRechercheSelection;