import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import * as Const from './Constant';
import { TableRow, TableCell } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 


class PageMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      maps : null,
      map : this.props.showDetailsMaps,
      hoveredArea: null, msg: null, moveMsg: null
    }
  }

  classes = makeStyles((Theme) =>
    createStyles({
    }),
  );

  provideMaps(){
    fetch(Const.URL_WS_ALL_MAPS + `?robot=${this.state.map}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ maps: data})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }
  getMAJMaps(){
    
    fetch(Const.URL_WS_PROVIDE_METRICS, { retry: 3, retryDelay: 1000 })
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
  
  handleCallbackOpenMapGestion= (idMap) =>{
    console.log("send robot id to MapGestion")
    this.props.callbackOpenMapGestion(idMap)
  }

  componentDidMount() {
    this.provideMaps();
  }
  

  render() {
  return (
    <div className={this.classes.root}>
    <Grid container spacing={2}>
       
    <Grid item  xs={12} md={8} lg={9}>
    <Card>
    
    <CardContent >
    
        <div>
        <img style={{float:"left", marginTop:"0.5em"}} width="40" src="./images/carrier.svg"/>
        </div>
                    
        <div style={{marginLeft:"3.5em"}}>
        <Typography style={{color:"BLACK"}} component="h5" variant="h5">
        robot  {this.state.map}
        </Typography>
        </div>
        <span >&nbsp;</span>
        <h1 > Select your Map </h1>
      <Table>
        <TableBody >
      { (this.state.maps != null) && (  this.state.maps.map((s) => { 
                
                return ( 
                  <TableRow key={s.pk} >
                     <TableCell align="center">
                     <h3 > Map {s.pk}</h3>
                    <figure >
                        <img key={s.pk} style={{paddingBottom:10}}  width="250"  src={ `data:image/png;base64,`+s.blob} onClick={() => this.handleCallbackOpenMapGestion(s.pk+"blob"+s.blob) }/>
                    </figure>
                     </TableCell>
                    </TableRow >
                )
          }))
          
          }
       </TableBody>
     </Table>
     
       
       
    </CardContent>
    </Card>
    
    </Grid>
    </Grid>
    </div>
  )}
}

export default PageMaps;