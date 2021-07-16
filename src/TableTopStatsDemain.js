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
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import * as Const from './Constant';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import Alert from '@material-ui/lab/Alert';
import DialogOuvrir from './DialogOuvrir';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ComposantTest from './ComposantTest';
import Tooltip from '@material-ui/core/Tooltip';

export default class TableTopStatsDemain extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      listeStats : this.props.listeStats,
      idStats : null,
      openDialogDetails: false,
    }
  }

  componentDidMount() {
    
  }

  openDetails = (id) => {
    this.setState({ idStats: id })
    this.setState({ openDialogDetails: true })
    
  }

  closeDetails = () => {
    this.setState({ openDialogDetails: false })
    this.openDialogDetails = false;
    
  }

  render() {
    return (
      <div>
      <TableContainer component={Paper}>
      <Table style={{cursor:"pointer"}} size="small" aria-label="simple table">
      <TableHead>
            <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="center" colSpan="2"><span style={{fontVariantCaps:"all-small-caps"}}>GAGNANT</span></TableCell>
            <TableCell align="center" colSpan="2"><span style={{fontVariantCaps:"all-small-caps"}}>PLACÉ</span></TableCell>
           
            </TableRow>
          </TableHead>
        <TableBody>

                  {(this.state.listeStats != null) && ( this.state.listeStats.map((s) => {
                       if(s.engDemain > 0){
                    
                        var chemin = "";
                        if(s.avatar != "n"){
                         chemin = s.avatar;
                        }else{
                         chemin = `./images/avatars/${s.id}.svg`;
                        }

                        var label = "";
                        if(s.label != ""){
                         label = s.label;
                        }else{
                         label = "SELEC#" + s.id
                        }

                          var colorRendementG = "#3F51B5";
                          if(s.rendementG < 0){
                            colorRendementG = "#B00020";
                          }
                          var colorRendement = "#3F51B5";
                          if(s.rendement < 0){
                            colorRendement = "#B00020";
                          }
                          return (
                            <TableRow onClick={() => this.openDetails(s.id) } size="small">
                            <TableCell style={{width:"18px"}} align="left"><img width="25" src={chemin}/></TableCell>
                          <TableCell align="left">
                          <Tooltip arrow title={<h3><i><u>DTF REQUETE</u></i> ©<br/><br/>{s.requete}</h3>}>
                            <span style={{color:"#3F51B5"}}>{label}</span>
                            </Tooltip></TableCell>
                            <TableCell align="left"><Badge badgeContent={s.engagement} color="primary">
                                <img width="18" height="18" src="./images/binoculars2.png"/>
                                </Badge></TableCell>
                            <TableCell align="center"><Rating name="read-only" size="small" max={4} value={s.reussiteG} precision={0.5} readOnly /></TableCell>
                            <TableCell align="center"><Avatar style={{backgroundColor:colorRendementG, width:"55px", height:"20px"}} variant="square"><span style={{fontSize:"12px"}}>{s.rendementG} %</span></Avatar></TableCell>
                            <TableCell align="center"><Rating name="read-only" size="small" max={4} value={s.reussite} precision={0.5} readOnly /></TableCell>
                            <TableCell align="center"><Avatar style={{backgroundColor:colorRendement, width:"55px", height:"20px"}} variant="square"><span style={{fontSize:"12px"}}>{s.rendement} %</span></Avatar></TableCell>
                           
                            
                            </TableRow>

                          )
                       }
                    })) }

        
          
          { (this.state.listeStats != null) && (this.state.listeStats.length == 0) && (
                      <Alert severity="info">Aucune statistiques trouvées.</Alert>
          ) }
          
        </TableBody>
        </Table>
        </TableContainer>

        <SwipeableDrawer
          anchor="right"
          open={this.state.openDialogDetails}
          onClose={this.closeDetails}
          onOpen={this.openDetails}
        >
          <div style={{width:"530px"}}>
            
              <ComposantTest apiKey = { this.props.apiKey } idStats = { this.state.idStats } drawerCloseTest = { this.closeDetails } />  
            
          </div>
      
    </SwipeableDrawer>

        
      </div>
    );
  }
}