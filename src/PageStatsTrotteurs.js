import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as Const from './Constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import NumberFormat from 'react-number-format';
import TableProfilTopCourse from './TableProfilTopCourse';
import TableProfilVitesseCourse from './TableProfilVitesseCourse';
import TableStatsTrotteurs from './TableStatsTrotteurs';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import TableHistoriqueTrotteur from './TableHistoriqueTrotteur';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

class PageStatsTrotteurs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      synthese : null,
      selectHippo: "",
      listeHippodromes : null,
      firstTimeOpen: true // used to load the result table only at startup
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    
    fetch(Const.URL_PARTANTS + `?token=${this.state.apiKey}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState( { listeHippodromes: data })
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })

  } 

  classes = makeStyles((theme: Theme) =>
  createStyles({
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

    this.provideStats(value)
  }
  
  provideStats(value){
    fetch(Const.URL_STATS_TROTTEUR + `?token=${this.state.apiKey}&trotteur=${value}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState( { synthese: data.historique })
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
    <Typography color="textSecondary" gutterBottom variant="h5" style={{color:"#454E54", lineHeight:"0.5em"}}>Revue statistiques</Typography>
      <div style={{marginTop:"1em"}}></div>
      <Typography color="textSecondary" gutterBottom variant="body1">Des rapports statistiques complets pour orienter vos jeux.</Typography>
      
      <Grid style={{marginTop:'1em'}} container spacing={3}>
      <Grid item xs={12}>
      { (this.state.listeHippodromes != null) && (
      <Autocomplete
          style={{width:"870px", cursor:"pointer"}}
          id="selectHippo"
          value={this.state.selectHippo}
          onChange={(event, value) => this.handleChange("selectHippo",value)}
          freeSolo
          options={this.state.listeHippodromes.map(option => option.nom)}
          renderInput={params => (
            <TextField style={{width:"870px", cursor:"pointer"}} {...params} label="Choisissez votre rapport" margin="normal" variant="outlined" />
          )}
        />
      )}
      { (this.state.listeHippodromes == null) && (<center><CircularProgress disableShrink /></center>) }

      { (this.state.synthese != null) && (
        <div style={{marginTop:"1em"}}>

          <Grid item xs={12}>
           <div style={{margin:"0.5em"}}>
           <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>HISTORIQUE</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">PERFORMANCES SUR LES 12 DERNIERS MOIS</Typography></TableCell>
                </TableRow>
                </TableHead>
              <TableBody>
              <TableRow>
              <TableCell>
                <TableHistoriqueTrotteur synthese={this.state.synthese}/>
              
                  </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                </TableContainer>
                </div>
          </Grid>  
   </div>
      )}
      

      </Grid>
   
    </Grid>
    </CardContent>
    </Card>
    </Container>
    </div>
  )}
}

export default PageStatsTrotteurs;