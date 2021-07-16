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



export default class TableStats extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      titre : props.titre,
      rubrique : props.rubrique,
      participation: props.participation,
      gagnant: props.gagnant,
      place: props.place,
    }
  }

  render() {
    return (
      <div style={{margin:"0.5em"}}>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell colSpan="3">{this.props.titre}<Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.rubrique}</Typography></TableCell>
            
          </TableRow>
          </TableHead>
        <TableBody>
          <TableCell align="center"><Avatar style={{backgroundColor:"#3F51B5", width:"28px", height:"20px"}} variant="square"><span style={{fontSize:"14px"}}>{this.props.participation}</span></Avatar></TableCell>
          <TableCell align="center"> <Rating name="size-medium" value={this.props.gagnant} precision={0.5} max={4} readOnly  /></TableCell>
          <TableCell align="center"> <Rating name="size-medium" value={this.props.place} precision={0.5} max={4} readOnly  /></TableCell>
        </TableBody>
        </Table>
        </TableContainer>
      </div>
    );
  }
}