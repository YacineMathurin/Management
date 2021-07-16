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
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

export default class TableStatsGlobal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      titre : props.titre,
      rubrique : props.rubrique,
      participation: props.participation,
      gagnant: props.gagnant,
      place: props.place,
      show: props.show,
    }
  }

  moreStatsTrotteur = () => {
    
    if(this.props.theme == "trotteur"){
      this.props.trotteurstats();
    }else{

    if(this.props.theme == "driver"){
      this.props.driverstats();
    }else{

    if(this.props.theme == "entraineur"){
      this.props.entraineurstats();
    }
    }}
  }

  render() {
    return (
      <div style={{margin:"0.5em"}}>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell colSpan="2"><span style={{color:"#3F51B5"}}>{this.props.titre}</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.rubrique}, SOIT {this.props.participation} COURSE(S)</Typography></TableCell>
          <TableCell align="right"><div align="right">
          <IconButton aria-label="informations">
          <AddBoxOutlinedIcon onClick={this.moreStatsTrotteur} fontSize="large" color="primary" />
          </IconButton>
            
            </div></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableRow>
          <TableCell><center><Typography noWrap={true}  style={{fontSize:"12px"}} gutterBottom variant="body2">GAGNANT</Typography>
    <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.gagnant}%</Typography></center></TableCell>
          <TableCell><center><Typography noWrap={true}  style={{fontSize:"12px"}} gutterBottom variant="body2">PLACÉ</Typography>
          <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.place}%</Typography></center></TableCell>
          <TableCell><center> <Typography noWrap={true}  style={{fontSize:"12px"}} gutterBottom variant="body2">DANS LES CINQ</Typography>
          <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.show}%</Typography></center></TableCell>
          </TableRow>
          <TableRow>
          <TableCell><center> <TinyPieChart data={this.props.gagnant}/></center></TableCell>
          <TableCell><center> <TinyPieChart data={this.props.place}/></center></TableCell>
          <TableCell><center> <TinyPieChart data={this.props.show}/></center></TableCell>
          </TableRow>
          
        </TableBody>
        </Table>
        </TableContainer>
      </div>
    );
  }
}