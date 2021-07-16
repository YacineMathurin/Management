import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import * as Const from './Constant';
import NumberFormat from 'react-number-format';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import BarChartAdmin from './BarChartAdmin';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import Alert from '@material-ui/lab/Alert';


class PageAdministration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      detail: "",
      synthese : null,
    }

    fetch(Const.URL_ADMINISTRATION + `?token=${this.state.apiKey}`, { retry: 3, retryDelay: 1000 })
      .then(res => res.json())
      .then((data) => {
        if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
          this.props.callbackNeedToLogin()
        } else {
        console.log(data)
        this.setState({ detail: data }) 
        }
      })
      .catch(console.log) 

  }

  classes = makeStyles((theme: Theme) =>
    createStyles({
    }),
  );

  render() {
  return (
    <div className={this.classes.root}>
     
     <Grid container spacing={2}>
        <Grid item xs={8}>
    
    <Card>
    <CardHeader
            avatar={
              <UpdateOutlinedIcon fontSize="large"/>   
            }
            
            title="État du logiciel"
            subheader="Informations sur l'état de nos bases de données."
          />
    <CardContent>
    
    <div>
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <Card>
          <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Mise à jour globale
          </Typography>
          <Grid container spacing={2}>
          <Grid item xs={6}>
          <span>Statistiques, indicateurs et données hippiques.</span>
          </Grid>
          <Grid item xs={6}>
            <div style={{float:"right"}}>
          { (this.state.detail != null && this.state.detail.etatGlobal == 0) && ( 
              <ErrorOutlineIcon  fontSize="large" style={{ color: "orange" }}/>
              )}
              { (this.state.detail != null && this.state.detail.etatGlobal == 1) && ( 
              <CheckCircleIcon  fontSize="large" style={{ color: "green" }}/>
              )}
              </div>
              </Grid>
              </Grid>
          </CardContent>
      </Card>
    </Grid>
    
      <Grid item xs={4}>
        <Card>
          <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Archive
          </Typography>
          <Table style={{width:'100%'}} aria-label="simple table">
          <TableBody>
          <TableRow>
              <TableCell align="left">Date</TableCell>
              { (this.state.detail != null) && ( 
              <TableCell align="right">{this.state.detail.dateArchive}</TableCell>
              )}
              { (this.state.detail == null) && (<TableCell align="right"> - </TableCell>) }    
          </TableRow>
          <TableRow>
              <TableCell align="left">Nombre de courses</TableCell>
              { (this.state.detail != null) && ( 
                
              <TableCell align="right"><NumberFormat value={this.state.detail.nombreCoursesArchive} displayType={'text'} thousandSeparator=' '/></TableCell>
              )}
              { (this.state.detail == null) && (<TableCell align="right"> - </TableCell>) }      
          </TableRow>
          <TableRow>
              <TableCell align="left">Nombre de partants</TableCell>
              { (this.state.detail != null) && ( 
              <TableCell align="right"> <NumberFormat value={this.state.detail.nombrePartantArchive} displayType={'text'} thousandSeparator=' '/></TableCell>
              )}
              { (this.state.detail == null) && (<TableCell align="right"> - </TableCell>) }  
          </TableRow>
          <TableRow>
              <TableCell align="left">État des mises à jour</TableCell>
              { (this.state.detail != null && this.state.detail.etatArchive == 0) && ( 
              <TableCell align="right"><CancelIcon fontSize="small" style={{ color: "red" }}/></TableCell>
              )}
              { (this.state.detail != null && this.state.detail.etatArchive == 1) && ( 
              <TableCell align="right"><CheckCircleIcon fontSize="small" style={{ color: "green" }}/></TableCell>
              )}
                  
          </TableRow>
          </TableBody>
          </Table>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Aujourd'hui
          </Typography>
          <Table style={{width:'100%'}} aria-label="simple table">
          <TableBody>
          <TableRow>
              <TableCell align="left">Date</TableCell>
              { (this.state.detail != null) && ( 
                
                <TableCell align="right">{this.state.detail.dateJour}</TableCell>
                )}
                { (this.state.detail == null) && (<TableCell align="right"> - </TableCell>) }     
          </TableRow>
          <TableRow>
              <TableCell align="left">Nombre de courses</TableCell>
              { (this.state.detail != null) && ( 
              <TableCell align="right"> <NumberFormat value={this.state.detail.nombreCourseJour} displayType={'text'} thousandSeparator=' '/></TableCell>
              )}
              { (this.state.detail == null) && (<TableCell align="right"> - </TableCell>) }   
          </TableRow>
          <TableRow>
              <TableCell align="left">Nombre de partants</TableCell>
              { (this.state.detail != null) && ( 
              <TableCell align="right"> <NumberFormat value={this.state.detail.nombrePartantJour} displayType={'text'} thousandSeparator=' '/></TableCell>
              )}
              { (this.state.detail == null) && (<TableCell align="right"> - </TableCell>) } 
          </TableRow>
          <TableRow>
              <TableCell align="left">État des mises à jour</TableCell>
              { (this.state.detail != null && this.state.detail.etatJour == 0) && ( 
              <TableCell align="right"><CancelIcon fontSize="small" style={{ color: "red" }}/></TableCell>
              )}
              { (this.state.detail != null && this.state.detail.etatJour == 1) && ( 
              <TableCell align="right"><CheckCircleIcon fontSize="small" style={{ color: "green" }}/></TableCell>
              )}
          </TableRow>
          </TableBody>
          </Table>
          </CardContent>
        </Card>  
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Demain
          </Typography>
          <Table style={{width:'100%'}} aria-label="simple table">
          <TableBody>
          <TableRow>
              <TableCell align="left">Date</TableCell>
              { (this.state.detail != null) && ( 
                
                <TableCell align="right">{this.state.detail.dateDemain}</TableCell>
                )}
                { (this.state.detail == null) && (<TableCell align="right"> - </TableCell>) }   
          </TableRow>
          <TableRow>
              <TableCell align="left">Nombre de courses</TableCell>
              { (this.state.detail != null) && ( 
              <TableCell align="right"> <NumberFormat value={this.state.detail.nombreCourseDemain} displayType={'text'} thousandSeparator=' '/></TableCell>
              )}
              { (this.state.detail == null) && (<TableCell align="right"> - </TableCell>) }    
          </TableRow>
          <TableRow>
              <TableCell align="left">Nombre de partants</TableCell>
              { (this.state.detail != null) && ( 
              <TableCell align="right"> <NumberFormat value={this.state.detail.nombrePartantDemain} displayType={'text'} thousandSeparator=' '/></TableCell>
              )}
              { (this.state.detail == null) && (<TableCell align="right"> - </TableCell>) }  
          </TableRow>
          <TableRow>
              <TableCell align="left">État des mises à jour</TableCell>
              { (this.state.detail != null && this.state.detail.etatDemain == 0) && ( 
              <TableCell align="right"><CancelIcon fontSize="small" style={{ color: "red" }}/></TableCell>
              )}
              { (this.state.detail != null && this.state.detail.etatDemain == 1) && ( 
              <TableCell align="right"><CheckCircleIcon fontSize="small" style={{ color: "green" }}/></TableCell>
              )}
              
          </TableRow>
          </TableBody>
          </Table>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
      <Card>
          <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Les dernières mises à jour (Archive)
          </Typography>

          { (this.state.detail.majs != null) && ( 
          <BarChartAdmin data = { this.state.detail.majs } />
          )}        
            { (this.state.detail.majs == null) && (<center><CircularProgress disableShrink /></center>) }
          </CardContent>
      </Card>
    </Grid>
    </Grid>
    </div>
   
    </CardContent>
    </Card>
    </Grid>

     <Grid item xs={4}>
        <Card>
        <CardHeader
            avatar={
              <EventNoteOutlinedIcon fontSize="large"/>   
            }
            
            title="Mises à jour"
            subheader="Informations sur les mises à jour."
          />
    <CardContent>
    <Alert severity="info">Prochaine mise à jour : Décembre 2020<br/>
             - Nouvelles statistiques sur les partants.<br/>
             - Nouvelles informations : Module TopChrono.
    </Alert>

    </CardContent>
        </Card>
    </Grid>

    </Grid>
    </div>
  )}
}

export default PageAdministration;