import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import * as Const from './Constant';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import TableFavori from './TableFavori';
import TableEngagement from './TableEngagement';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Divider } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import TableResultats from './TableResultats';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CloseIcon from '@material-ui/icons/Close';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableProgrammePartants from './TableProgrammePartants';
import TableSynthese from './TableSynthese';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import DashboardIcon from '@material-ui/icons/Dashboard';

class PageTableauDeBord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: this.props.apiKey,
      filtreReussite:[0,100],
      filtreRapportMoyen:[0,100],
      filtreEcartMax:[0,100],
      filtreIndicateurEcart:[0,200],
      filtreActivite:[0,100],
      listeMetrics: null,
      printTable: "block",
      printCard:"none",
    }
  }

  provideMetrics(){
    fetch(Const.URL_WS_ALL_ROBOTS+"?email="+localStorage.getItem('username'), { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      console.log("it's me MR")
      console.log(data)
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        console.log("ELse it's me MR")
        this.setState({ listeMetrics: data})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }

  componentDidMount() {
    this.provideMetrics();
  }

  handleCallbackOpenDetails = (idRobot) => {
    console.log("send robot id to PageAide")
    this.props.callbackOpenDetails(idRobot)
    console.log(idRobot)
    console.log(this.props.callbackOpenDetails(idRobot))
  }

  handleCallbackOpenMaps= (idRobot) =>{
    console.log("send robot id to PageMaps")
    this.props.callbackOpenMaps(idRobot)
    console.log(idRobot)
    console.log(this.props.callbackOpenMaps(idRobot))
  }

  handlePrintTable = () => {
    this.setState( { printTable: "block" })
    this.setState( { printCard: "none" })
  }

  handlePrintCard = () => {
    this.setState( { printTable: "none" })
    this.setState( { printCard: "block" })
  }

  render() {
  return (
    <div >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9}>
        <Card>
          <CardHeader
            avatar={
              <div>
              <img width="32" src="./images/carrier.svg"/>
              </div>
            }
            
            title="Mon Parcs cobotique"
            subheader="Retrouvez vos robots suiveurs"
          />
          <div style={{float:"right", marginTop:"-4em", marginRight:"2em"}}>
          <Button
                      style={{marginTop:"1em", display:this.state.printTable}}
                      fullWidth="false"
                      onClick={() => this.handlePrintCard() }
                      variant="outlined"
                        color="primary"
                        size="small"
                      >
              <DashboardIcon fontSize='large' />
                      </Button>

                       <Button
                      style={{marginTop:"1em", display:this.state.printCard}}
                      fullWidth="false"
                      onClick={() => this.handlePrintTable() }
                      variant="outlined"
                        color="primary"
                        size="small"
                      >
              <ViewStreamIcon fontSize='large' />
                      </Button>
          
          </div>
            
            <CardContent style={{display:this.state.printTable}}>
            <Table>
                <TableHead>
                  <TableRow>
                      <TableCell align="center">ID Client </TableCell>
                      <TableCell align="center">ID Robot</TableCell>
                      <TableCell align="center">En mouvement</TableCell>
                      <TableCell align="center">Connecté</TableCell>
                     {/* <TableCell align="center"><img  width="24" src="./images/microchip.svg"/></TableCell>*/}
                      <TableCell align="center">Autonomie </TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
            { (this.state.listeMetrics != null) && ( this.state.listeMetrics.map((s) => {

                var batterie = "./images/b1.png";
              
                if(s.BAT_LEVEL <= 55 && s.BAT_LEVEL >= 45 ){
                  batterie = "./images/b50.png";
                }else if(s.BAT_LEVEL < 45) {
                  batterie = "./images/b0.png";
                }

                var processor = "./images/check.svg";
               /* if(s.system.cpu >= 80){
                  processor = "./images/warning.svg";
                }*/

              var dispo = "./images/switch-on.svg";
              var timeS= Date.now() - s.TIMESTAMP;
              var dateS = new Date(timeS * 1000);
              var minutesS = dateS.getMinutes();
              console.log("robot " +s.ID_ROBOT +" nb minutes="+minutesS);

              if(minutesS>=15){
                dispo = "./images/switch-off.svg";
              }

               return ( 
               
                <TableRow>
                  <TableCell align="center">{s.ID_CLIENT}</TableCell>
                  <TableCell align="center">{s.ID_ROBOT}</TableCell>
                  <TableCell align="center"> <img style={{marginTop:"0.5em"}} width="34" src={dispo}/></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"><img  width="30" src={batterie}/></TableCell>
                <TableCell align="center">
                  
                  <Button
                      fullWidth="false"
                      width="2em"
                      onClick={() => this.handleCallbackOpenDetails(s.ID_ROBOT) }
                      variant="contained"
                        color="primary"
                        size="small"
                      >
                        détails
                      </Button>
                      
                  </TableCell>
                  <TableCell align="center">
                  
                     <Button
                      fullWidth="false"
                      width="2em"
                      onClick={() => this.handleCallbackOpenMaps(s.ID_ROBOT) }
                      variant="contained"
                        color="primary"
                        size="small"
                      >
                         Maps
                      </Button>
                  </TableCell>
                </TableRow>
              
               )
            })) }
            </Table>
            </CardContent>

            <CardContent style={{display:this.state.printCard}}>
            <Grid container spacing={2}>
              
            { (this.state.listeMetrics != null) && ( this.state.listeMetrics.map((s) => {

              var batterie = "./images/b1.png";
                            
              if(s.BAT_LEVEL <= 55 && s.BAT_LEVEL >= 45 ){
                batterie = "./images/b50.png";
              }else if(s.BAT_LEVEL < 45) {
                batterie = "./images/b0.png";
              }

              var processor = "./images/check.svg";
             /* if(s.system.cpu >= 80){
                processor = "./images/warning.svg";
              }*/

              var dispo = "./images/switch-on.svg";
              var timeS= Date.now() - s.TIMESTAMP;
              var dateS = new Date(timeS * 1000);
              var minutesS = dateS.getMinutes();
              console.log(minutesS);

              if(minutesS>=15){
                dispo = "./images/switch-off.svg";
              }

              return ( 
                <Grid item xs={12} md={4} lg={3}>
                <Card>
               
                  <CardContent>
                  <div>
                    <img style={{float:"left", marginTop:"0.5em"}} width="24" src="./images/carrier.svg"/>
                    </div>
                    <div>
                    <img style={{float:"right", marginTop:"0.5em"}} width="34" src={dispo}/>
                    </div>
                    <div style={{marginLeft:"2.5em"}}>
                    <Typography style={{color:"BLACK"}} component="span" variant="span">
                      {s.ID_CLIENT}
                    </Typography>
                    <Typography style={{color:"BLACK"}} component="span" variant="span">
                      {s.ID_ROBOT}
                    </Typography>
                    <Typography style={{fontSize:"14px"}} color="textSecondary">
                      description
                    </Typography>
                    </div>
                    <Divider style={{marginTop:"1em"}}/>
                    <div>
                      <Table>
                        <TableRow>
                          <TableCell><img  width="24" src="./images/microchip.svg"/></TableCell>
                          <TableCell align="right"><img  width="24" src={processor}/></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><img  width="24" src="./images/car-battery.svg"/></TableCell>
                          <TableCell align="right"><img  width="30" src={batterie}/></TableCell>
                        </TableRow>
                        
                      </Table>
                      <Button
                      style={{marginTop:"1em"}}
                      fullWidth="true"
                      onClick={() => this.handleCallbackOpenDetails(s) }
                      variant="contained"
                        color="primary"
                        size="small"
                      >
                        détails
                      </Button>
                      <Button
                      style={{marginTop:"1em"}}
                      fullWidth="true"
                      onClick={() => {} }
                      variant="contained"
                        color="primary"
                        size="small"
                      >
                        Maps
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              </Grid>
              )
            
            })) }

            </Grid>

            </CardContent>
          </Card>  
          
        </Grid>

    <Grid item xs={12} md={4} lg={3} >
        <Card>
          <CardHeader
            avatar={
              <TuneOutlinedIcon fontSize="large"/>
            }
            
            title="Filtrage"
            subheader="Filtrez votre parc cobotique"
          />
          
            <CardContent>

                  <FormControl size="small" fullWidth variant="outlined">
          
          <OutlinedInput
            size="small"
            value={this.state.motCle}
            onChange={this.handleMotCle}
            startAdornment={<SearchOutlinedIcon position="start"></SearchOutlinedIcon>}
          />
        </FormControl>

         

  <div style={{marginTop:"1.5em"}}>
        <FormControlLabel
        control={
          <Checkbox
          color="primary"

            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            name="checkedI"
          />
        }
         label={<img  style={{marginTop:"0.5em"}} width="30" src="./images/switch-on.svg"/>}
      />

       <FormControlLabel
        control={
          <Checkbox
          color="primary"

            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            name="checkedI"
          />
        }
         label={<img  style={{marginTop:"0.5em"}} width="30" src="./images/switch-off.svg"/>}
      />
        </div>

        <div>
        <FormControlLabel
        control={
          <Checkbox
          color="primary"

            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            name="checkedI"
          />
        }
         label={<img  style={{marginTop:"0.5em"}} width="30" src="./images/check.svg"/>}
      />

       <FormControlLabel
        control={
          <Checkbox
          color="primary"

            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            name="checkedI"
          />
        }
         label={<img  style={{marginTop:"0.5em"}} width="30" src="./images/warning.svg"/>}
      />
        </div>

        <FormControlLabel
        control={
          <Checkbox
          color="primary"

            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            name="checkedI"
          />
        }
         label={<img  style={{marginTop:"0.5em"}} width="30" src="./images/b0.png"/>}
      />

          <FormControlLabel
        control={
          <Checkbox
          color="primary"

            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            name="checkedI"
          />
        }
         label={<img  style={{marginTop:"0.5em"}} width="30" src="./images/b50.png"/>}
      />

          <FormControlLabel
        control={
          <Checkbox
          color="primary"

            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            name="checkedI"
          />
        }
         label={<img  style={{marginTop:"0.5em"}} width="30" src="./images/b1.png"/>}
      />

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

export default PageTableauDeBord;