import React, { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Badge from '@material-ui/core/Badge';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import * as Const from './Constant';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ComposantTest from './ComposantTest';
import Rating from '@material-ui/lab/Rating';
import ToggleButton from '@material-ui/lab/ToggleButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import Tooltip from '@material-ui/core/Tooltip';


export default class TableFavori extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      listeFavoris: this.props.listeFavoris,
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

  provideFavori(){
    fetch(Const.URL_PROVIDE_FAVORI + `?token=${this.props.apiKey}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ listeFavoris: data})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }

  refresh = () => {
    this.setState({ listeFavoris: null})
    this.provideFavori();
  }

  delFavori = (id) => {
    
    fetch(Const.URL_DELETE_FAVORI + `?token=${this.props.apiKey}&id=${id}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } 
      this.provideFavori();
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
}

  render() {
    return (
      <div>
      <TableContainer component={Paper}>
      <Table style={{cursor:"pointer"}} size="small" aria-label="simple table">
      <TableHead>
            <TableRow>
            <TableCell>
              <AutorenewIcon fontSize="small" onClick={() => this.refresh()} />
            </TableCell>
            <TableCell></TableCell>
            
            <TableCell align="center"><span style={{fontVariantCaps:"all-small-caps"}}>GAGNANT</span></TableCell>
            <TableCell align="center"><span style={{fontVariantCaps:"all-small-caps"}}>PLACÉ</span></TableCell>
            <TableCell></TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
        
        {(this.state.listeFavoris != null) && ( this.state.listeFavoris.map((s) => {
                   
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
   
                          return (
          <TableRow size="small">
          <TableCell onClick={() => this.openDetails(s.id) } style={{width:"18px"}} align="left">
          <Badge badgeContent={s.engagement} color="primary"><img width="25" height="25" src={chemin}/>
          </Badge></TableCell>
          <TableCell onClick={() => this.openDetails(s.id) } align="left">
          <Tooltip arrow title={<h3><i><u>DTF REQUETE</u></i> ©<br/><br/>{s.requete}</h3>}>
            <div>
            <span style={{color:"#3F51B5"}}>{s.critere}</span>
            <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{s.description}</Typography>
            </div>

            </Tooltip>
          </TableCell>
          
          <TableCell align="center"><Rating name="read-only" size="small" max={4} value={s.reussiteG} precision={0.5} readOnly /></TableCell>
          <TableCell align="center"><Rating name="read-only" size="small" max={4} value={s.reussitePL} precision={0.5} readOnly /></TableCell>
          <TableCell align="right"><DeleteForeverOutlinedIcon onClick={() => this.delFavori(s.id)} size="small"/></TableCell>
          </TableRow>

                          )
                        })) }
         

        </TableBody>
        </Table>
        </TableContainer>
        { (this.state.listeFavoris != null) && (this.state.listeFavoris.length == 0) && (

<Alert style={{marginTop:"1em"}} severity="info">Vous n'avez pas de statistiques suivies.</Alert>
) } 
        { (this.state.listeFavoris == null) && (<div style={{margin:"0.5em"}}><center><CircularProgress disableShrink /></center></div>) }
        <TableContainer style={{marginTop:"1em"}} component={Paper}>
        <Table style={{cursor:"pointer"}} size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell style={{width:"5px"}}>
                <CheckOutlinedIcon size="small"/>
              </TableCell>
              <TableCell> 
                <Typography noWrap={true} color="textSecondary" style={{fontSize:"14px"}} gutterBottom variant="body2">
                Les notifications par e-mail automatiques sont activées.
                </Typography>
              </TableCell>
            
            </TableRow>
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