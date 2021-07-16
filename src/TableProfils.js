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
import TableProfilStats from './TableProfilStats';

export default class TableProfils extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data : props.data,      
    }
  }

  handleChangePanelTrotteur(){

  }

  render() {
    return (
      <div style={{margin:"0.5em"}}>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>VUE TROTTEUR</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.data.nombreTrotteur} TROTTEURS ANALYSÉS, {this.props.data.nombreTrotteurRetenu} REMARQUABLES</Typography></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableProfilStats donnees={this.props.data.optimiseurTrotteur} />
        </TableBody>
        </Table>
        </TableContainer>

        <TableContainer style={{marginTop:"1em"}} component={Paper}>
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>VUE DRIVER</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.data.nombreDriver} DRIVERS ANALYSÉS, {this.props.data.nombreDriverRetenu} REMARQUABLES</Typography></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableProfilStats donnees={this.props.data.optimiseurDriver} />
        </TableBody>
        </Table>
        </TableContainer>

        <TableContainer style={{marginTop:"1em"}} component={Paper}>
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>VUE ENTRAINEUR</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.data.nombreEntraineur} ENTRAINEURS ANALYSÉS, {this.props.data.nombreEntraineurRetenu} REMARQUABLES</Typography></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableProfilStats donnees={this.props.data.optimiseurEntraineur} />
        </TableBody>
        </Table>
        </TableContainer>
      
        <TableContainer style={{marginTop:"1em"}} component={Paper}>
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>VUE HIPPODROME</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.data.nombreHippodrome} HIPPODROMES ANALYSÉS, {this.props.data.nombreHippodromeRetenu} REMARQUABLES</Typography></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableProfilStats donnees={this.props.data.optimiseurHippodrome} />
        </TableBody>
        </Table>
        </TableContainer>

        <TableContainer style={{marginTop:"1em"}} component={Paper}>
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>VUE CATÉGORIE</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.data.nombreCategorie} CATÉGORIES ANALYSÉES, {this.props.data.nombreCategorieRetenu} REMARQUABLES</Typography></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableProfilStats donnees={this.props.data.optimiseurCategorie} />
        </TableBody>
        </Table>
        </TableContainer>
        <TableContainer style={{marginTop:"1em"}} component={Paper}>
      
      
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell colSpan="3"><span style={{color:"#3F51B5"}}>VUE STATUT DE FAVORI</span><Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{this.props.data.nombreFavori} STATUT FAVORI ANALYSÉS</Typography></TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
        <TableProfilStats donnees={this.props.data.optimiseurFavori} />
        </TableBody>
        </Table>
        </TableContainer>

      </div>
    );
  }
}