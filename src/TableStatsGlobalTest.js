import React, { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TinyPieChart from './TinyPieCharts';
import NumberFormat from 'react-number-format';




export default class TableStatsGlobalTest extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      titre : props.titre,
      rubrique : props.rubrique,
      gagnant: props.gagnant,
      totalCourse: props.participation,
      place: props.place,
      chemin :"./images/avatars/" + props.idStats + ".svg",
    }
    if(props.avatar != "n"){
      this.state.chemin = props.avatar;
    }
  }

  render() {
    return (
      
      <div style={{margin:"0.5em"}}>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell colSpan="2"><span style={{color:"#3F51B5"}}>SÉLECTION</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">DÉTAILS ET CRITÈRES</Typography></TableCell>
          <TableCell><img style={{float:"right"}} width="50" height="50" src={this.state.chemin}/></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">Taux d'activité</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="right">{this.props.activite} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Dernier jeu</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="right">{this.props.dateDernPari}</TableCell>
          </TableRow>
          <TableRow>
          <TableCell colSpan="3" align="left"><Typography color="textPrimary" style={{fontSize:"13px"}} gutterBottom variant="body2">
          <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2"><i><b>DTF REQUETE</b></i> ©</Typography>{this.props.requete}</Typography></TableCell>
            
          </TableRow>
          
        </TableBody>
        </Table>
        </TableContainer>

        <div style={{marginTop:"1em"}}>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>{this.props.titre}</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.rubrique} SUR <span> <NumberFormat value={this.state.totalCourse} displayType={'text'} thousandSeparator=' '/></span> COURSES PMU</Typography></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableRow>
          <TableCell><center><Typography noWrap={true}  style={{fontSize:"12px"}} gutterBottom variant="body2">GAGNANT</Typography>
          <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.gagnant}% ({this.props.nbGagnant})</Typography></center></TableCell>
          <TableCell><center><Typography noWrap={true}  style={{fontSize:"12px"}} gutterBottom variant="body2">DANS LES PLACES</Typography>
          <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.place}% ({this.props.nbPlace})</Typography></center></TableCell>
          </TableRow>
          <TableRow>
          <TableCell><center> <TinyPieChart data={this.props.gagnant}/></center></TableCell>
          <TableCell><center> <TinyPieChart data={this.props.place}/></center></TableCell>
          
          </TableRow>
          
        </TableBody>
        </Table>
        </TableContainer>
        </div>
      </div>
    );
  }
}