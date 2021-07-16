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
import NumberFormat from 'react-number-format';
import TinyBarChart from './TinyBarChart';
import Tooltip from '@material-ui/core/Tooltip';
import TestLineChartFormeComplet from './TestLineChartFormeComplet';

export default class TableMetric extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data : props.data,      
    }
  }

  render() {
    var colorRendementG = "#3F51B5";
    if(this.props.data.rendementG < 0){
      colorRendementG = "#B00020";
    }
    var colorRendement = "#3F51B5";
    if(this.props.data.rendement < 0){
      colorRendement = "#B00020";
    }
    return (
      <div style={{margin:"0.5em"}}>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>INFORMATIONS</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">GÉNÉRALES</Typography></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableRow>
          <TableCell align="left">Nombre de jours retenus</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.totalJour} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Nombre de courses jouées</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.totalCourse} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Nombre de chevaux sélectionnés</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.totalChevaux} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Nombre de chevaux par jour</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.chevauxParJour} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Nombre de chevaux par course</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.chevauxParCourse} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
        <TableContainer style={{marginTop:"1em"}} component={Paper}>
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>ÉTUDE DU JEU SIMPLE GAGNANT</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">PERFORMANCE</Typography></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableRow>
          <TableCell colSpan="2" >
          { (this.props.data.sparklineG != null  ) && (
            <TinyBarChart data ={this.props.data.sparklineG}/>
          )}
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan="2" >
          { (this.props.data.evolutionG != null  ) && (
            
            <TestLineChartFormeComplet data={this.props.data.evolutionG}/>
          )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Nombre de chevaux gagnant</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.totalGagnant} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Total des gains</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.totalGainG} displayType={'text'} thousandSeparator=' '/> €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Gain moyen</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.gainMoyG} displayType={'text'} thousandSeparator=' '/> €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Écart maximum constaté</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.ecartPerdantMaxG} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Écart en cours</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.ecartPerdantEnCoursG} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Rentabilité</TableCell>
          <TableCell align="right">
            <Avatar style={{backgroundColor:colorRendementG, width:"55px", height:"20px", float:"right"}} variant="square"><span style={{fontSize:"12px"}}>{this.props.data.rendementG} %</span></Avatar>
          </TableCell>
        </TableRow>
        </TableBody>
        </Table>
        </TableContainer>

        <TableContainer style={{marginTop:"1em"}} component={Paper}>
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>ÉTUDE DU JEU SIMPLE PLACÉ</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">PERFORMANCE</Typography></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableRow>
          <TableCell colSpan="2" >
          { (this.props.data.sparkline != null  ) && (
            <TinyBarChart data ={this.props.data.sparkline}/>
          )}
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan="2" >
          { (this.props.data.evolution != null  ) && (
            <TestLineChartFormeComplet data={this.props.data.evolution}/>
          )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Nombre de chevaux placé</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.totalPlace} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Total des gains</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.totalGain} displayType={'text'} thousandSeparator=' '/> €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Gain moyen</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.gainMoy} displayType={'text'} thousandSeparator=' '/> €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Écart maximum constaté</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.ecartPerdantMax} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Écart en cours</TableCell>
          <TableCell align="right"><NumberFormat value={this.props.data.ecartPerdantEnCours} displayType={'text'} thousandSeparator=' '/></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Rentabilité</TableCell>
          <TableCell align="right">
            <Avatar style={{backgroundColor:colorRendement, width:"55px", height:"20px", float:"right"}} variant="square"><span style={{fontSize:"12px"}}>{this.props.data.rendement} %</span></Avatar>
          </TableCell>
        </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
      </div>
    );
  }
}